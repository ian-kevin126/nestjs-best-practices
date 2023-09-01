/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-30 08:58:58
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-01 09:38:19
 * @FilePath: /nestjs-practices/server/src/auth/auth.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getUserDto } from 'src/user/dto/get-user.dto';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  async signin(username: string, password: string) {
    // const res = await this.userService.findAll({ username } as getUserDto);
    const user = await this.userService.find(username);

    if (!user) {
      throw new ForbiddenException('用户不存在，请注册');
    }

    // 对用户密码进行加密比对
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或密码错误');
    }

    return await this.jwt.signAsync({
      username: user.username,
      sub: user.id,
    });

    // if (user.password === password) {
    //   // 生成 token
    //   return await this.jwt.signAsync(
    //     {
    //       username: user.username,
    //       sub: user.id,
    //     },
    //     {
    //       // 局部设置过期时间为1天，也可以在 auth.module.ts 中全局设置
    //       expiresIn: '1d',
    //     },
    //   );
    // }

    // throw new UnauthorizedException(); // sign -> service -> jwtService
  }

  async signup(username: string, password: string) {
    const user = await this.userService.find(username);

    if (user) {
      throw new ForbiddenException('用户已存在');
    }

    const res = await this.userService.create({
      username,
      password,
    });

    return res;
  }
}
