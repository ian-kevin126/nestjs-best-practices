/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-27 23:25:40
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-01 09:26:48
 * @FilePath: /nestjs-practices/server/src/user/user.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { Logs } from '../logs/logs.entity';
import { Roles } from 'src/roles/roles.entity';
import { getUserDto } from './dto/get-user.dto';
import { conditionUtils } from 'src/utils/db.helper';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  findAll(query: getUserDto) {
    // SQL：SELECT * FROM user u, profile p, role r WHERE u.id = p.uid AND u.id = r.uid AND ...
    // or
    // SELECT * FROM user u LEFT JOIN profile p ON u.id = p.uid LEFT JOIN role r on u.id = r.uid WHERE ...
    // 分页 SQL-> LIMIT 10 OFFSET 10

    const { limit, page, username, gender, role } = query;
    const take = limit || 10;
    const skip = ((page || 1) - 1) * take;

    const obj = {
      'user.username': username,
      'profile.gender': gender,
      'roles.id': role,
    };

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles');

    const newQuery = conditionUtils<User>(queryBuilder, obj);

    // inner join 和 left join 和 out join 的区别
    // 这里要注意，第一个where之后，要使用andWhere，如果再继续使用where，则会覆盖之前的where，因为在纯SQL中WHERE之后也是AND再继续加WHERE
    return newQuery.take(take).skip(skip).getMany();

    // return this.userRepository.find({
    //  只查询username和id信息，因为不希望返回敏感的password信息
    //   select: {
    //     username: true,
    //     id: true,
    //     // profile 只查询 gender
    //     profile: {
    //       gender: true,
    //     },
    //   },
    //  连表查询
    //   relations: {
    //     profile: true,
    //     roles: true,
    //   },
    //   条件
    //   where: {   // AND 还是 OR，实际上是 AND
    //     username,
    //     profile: {
    //       gender,
    //     },
    //     roles: {
    //       id: role,
    //     },
    //   },
    //    分页
    //   take,
    //   skip,
    // })
  }

  find(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>) {
    // 默认角色：普通用户
    if (!user.roles) {
      const role = await this.rolesRepository.findOne({
        where: {
          id: 2,
        },
      });
      user.roles = [role];
    }

    if (user.roles instanceof Array && typeof user.roles[0] === 'number') {
      // 查询所有的用户角色
      user.roles = await this.rolesRepository.find({
        where: {
          id: In(user.roles),
        },
      });
    }

    const userTmp = await this.userRepository.create(user);

    // 对用户秘密使用argon2加密
    userTmp.password = await argon2.hash(userTmp.password);

    // try {
    const res = await this.userRepository.save(userTmp);
    return res;
    // } catch (error) {
    //   console.log(
    //     '🚀 ~ file: user.service.ts:97 ~ UserService ~ create ~ error:',
    //     error,
    //   );
    //   if (error.errno === 1062) {
    //     // 将准确的错误信息返回给前端
    //     throw new HttpException(error.sqlMessage, 500);
    //   }
    // }
  }

  async update(id: number, user: Partial<User>) {
    // 下面的update只适合单模型的更新，不适合有关系的模型更新
    // return this.userRepository.update(id, user);

    const userTemp = await this.findProfile(id);
    const newUser = this.userRepository.merge(userTemp, user);
    // 联合模型更新，需要使用save或QueryBuilder
    return this.userRepository.save(newUser);
  }

  async remove(id: number) {
    // return this.userRepository.delete(id);
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    });
  }

  async findUserLogs(id: number) {
    const user = await this.findOne(id);
    return this.logsRepository.find({
      where: {
        user: user.logs,
      },
      // relations: {
      //   user: true,
      // },
    });
  }

  findLogsByGroup(id: number) {
    // SELECT logs.result as rest, COUNT(logs.result) as count from logs, user WHERE user.id = logs.userId AND user.id = 2 GROUP BY logs.result;
    // return this.logsRepository.query(
    //   'SELECT logs.result as rest, COUNT(logs.result) as count from logs, user WHERE user.id = logs.userId AND user.id = 2 GROUP BY logs.result',
    // );
    return (
      this.logsRepository
        .createQueryBuilder('logs')
        .select('logs.result', 'result')
        .addSelect('COUNT("logs.result")', 'count')
        .leftJoinAndSelect('logs.user', 'user')
        .where('user.id = :id', { id })
        .groupBy('logs.result')
        .orderBy('count', 'DESC')
        .addOrderBy('result', 'DESC')
        .offset(2)
        .limit(3)
        // .orderBy('result', 'DESC')
        .getRawMany()
    );
  }
}
