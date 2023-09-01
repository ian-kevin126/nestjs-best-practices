/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-31 23:35:12
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-08-31 23:55:18
 * @FilePath: /nestjs-practices/server/src/guards/jwt.guard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}

// 装饰器
// @JwtGuard()
