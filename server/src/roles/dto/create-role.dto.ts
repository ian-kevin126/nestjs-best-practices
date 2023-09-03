/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-09-02 18:19:02
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-02 19:13:13
 * @FilePath: /nestjs-best-practices/server/src/roles/dto/create-role.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
