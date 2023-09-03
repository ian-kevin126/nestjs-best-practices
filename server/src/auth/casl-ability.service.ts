/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-09-03 22:45:39
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-03 22:56:10
 * @FilePath: /nestjs-best-practices/server/src/auth/casl-ability.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';

@Injectable()
export class CaslAbilityService {
  forRoot() {
    // 针对于全局的
    const { can, build } = new AbilityBuilder(createMongoAbility);

    can('manage', 'all');

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
