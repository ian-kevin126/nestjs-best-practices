/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-09-03 22:45:39
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-04 00:12:45
 * @FilePath: /nestjs-best-practices/server/src/auth/casl-ability.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { Logs } from '../logs/logs.entity';
import { UserService } from '../user/user.service';
import { Menus } from '../menus/menus.entity';
import { getEntities } from '../utils/common';

@Injectable()
export class CaslAbilityService {
  constructor(private userService: UserService) {}

  async forRoot(username: string) {
    // 针对于全局的
    const { can, build } = new AbilityBuilder(createMongoAbility);

    // can('manage', 'all');
    // menu 名称、路径、acl -> actions -> 名称、路径 -> 实体对应
    // path -< prefix -> 写死在项目代码里

    // 其他思路：acl -> 单独的表来存储 -> LogController名称（通过context.getClass().name来取） + Action
    // 生产过程中：log -> sys:log -> sys:log:read, sys:log:write...
    const user = await this.userService.find(username);

    // user -> 1:n roles -> 1:n menus -> 去重 {}
    const obj = {} as Record<string, unknown>;

    user.roles.forEach((o) => {
      o.menus.forEach((menu) => {
        // path -> acl -> actions
        // 通过Id去重
        obj[menu.id] = menu;
      });
    });

    const menus = Object.values(obj) as Menus[];

    menus.forEach((menu) => {
      const actions = menu.acl.split(',');
      for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        can(action, getEntities(menu.path));
      }
    });

    // can('read', Logs);
    // cannot('update', Logs);

    const ability = build({
      detectSubjectType: (object) => object.constructor,
    });

    // ability.can / ability.cannot 的参数是一个或者多个，为了解耦，我们要采用控制反转的思想
    // 将控制权交出去，也就是让用户传一个函数，传递过来之后，直接执行就可以了
    // @CheckPolicies((ability) => ability.can(Action, User, [''])
    // @CheckPolicies((ability) => ability.cannot('manage', 'all'))

    return ability;
  }
}
