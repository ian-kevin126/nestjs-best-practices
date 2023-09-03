/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-09-04 00:09:18
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-04 00:09:35
 * @FilePath: /nestjs-best-practices/server/src/utils/common.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { User } from '../user/user.entity';
import { Logs } from '../logs/logs.entity';
import { Roles } from '../decorators/roles.decorator';
import { Menus } from '../menus/menus.entity';

export const getEntities = (path: string) => {
  // /users ->User , /logs -> Logs, /roles -> Roles, /menus -> Menus, /auth -> 'Auth'
  const map = {
    '/users': User,
    '/logs': Logs,
    '/roles': Roles,
    '/menus': Menus,
    '/auth': 'Auth',
  };

  for (let i = 0; i < Object.keys(map).length; i++) {
    const key = Object.keys(map)[i];
    if (path.startsWith(key)) {
      return map[key];
    }
  }
};
