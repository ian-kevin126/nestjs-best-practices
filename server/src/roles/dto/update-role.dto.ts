/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-09-02 18:19:02
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-02 19:08:04
 * @FilePath: /nestjs-best-practices/server/src/roles/dto/update-role.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

// PartialType 类似 TypeScript 中的 Partial
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
