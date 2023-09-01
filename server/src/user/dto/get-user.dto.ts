/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-28 22:57:32
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-08-28 22:58:09
 * @FilePath: /nestjs-practices/server/src/user/dto/get-user.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface getUserDto {
  page: number;
  limit?: number;
  username?: string;
  role?: number;
  gender?: number;
}
