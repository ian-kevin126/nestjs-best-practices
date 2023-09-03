/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-31 09:57:00
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-02 18:28:01
 * @FilePath: /nestjs-best-practices/server/src/guards/admin.guard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  // 使用了@Injectable()，说明就是属于DI系统的，就能使用userService实例
  // 常见的错误：在使用AdminGuard未导入UserModule
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 获取请求对象
    const req = context.switchToHttp().getRequest();
    // 2. 获取请求中的用户信息进行逻辑上的判断 -> 角色判断
    // console.log('user', req.user);
    const user = (await this.userService.find(req.user.username)) as User;
    // console.log(
    //   '🚀 ~ file: admin.guard.ts ~ line 16 ~ AdminGuard ~ canActivate ~ user',
    //   user,
    // );
    // 普通用户
    // 后面加入更多的逻辑
    if (user && user.roles.filter((o) => o.id === 2).length > 0) {
      // 只有在role为2的情况下才去继续往下走
      return true;
    }
    return false;
  }
}
