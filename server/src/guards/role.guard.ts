/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-09-03 09:58:58
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-03 10:26:26
 * @FilePath: /nestjs-best-practices/server/src/guards/role.guard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enum/roles.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 要拿到用户的角色信息：
    // 思路1 ：jwt -> userId -> user -> roles
    const requireRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(
      '🚀 ~ file: role.guard.ts:27 ~ RoleGuard ~ requireRoles:',
      requireRoles,
    );
    // 🚀 ~ file: role.guard.ts:27 ~ RoleGuard ~ requireRoles: [ 'admin' ]

    if (!requireRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    // 拿到用户角色信息
    const user = await this.userService.find(req.user.username);
    console.log(
      '🚀 ~ file: role.guard.ts:39 ~ RoleGuard ~ canActivate ~ user:',
      user,
    );
    const roleIds = user.roles.map((o) => o.id);
    // 与上面的 requireRoles 比对，看看有没有对应的角色权限
    const flag = requireRoles.some((role) => roleIds.includes(role));
    console.log(
      '🚀 ~ file: role.guard.ts:46 ~ RoleGuard ~ canActivate ~ flag:',
      flag,
    );

    return flag;
  }
}
