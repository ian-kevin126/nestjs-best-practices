/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-09-02 22:10:47
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-03 00:08:59
 * @FilePath: /nestjs-best-practices/server/src/menus/dto/create-menu.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsString()
  @IsOptional()
  acl: string;
}
