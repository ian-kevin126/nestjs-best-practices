/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-09-02 22:10:47
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-02 22:52:56
 * @FilePath: /nestjs-best-practices/server/src/menus/entities/menus.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../roles/roles.entity';

@Entity()
export class Menus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  order: number;

  // 这里因为只有五个操作策略（CREATE, READ, UPDATE, DELETE, MANAGE)，所以用数组即可
  @Column()
  acl: string;

  // 一个 role 对应多个 menu 及权限
  @ManyToMany(() => Roles, (roles) => roles.menus)
  @JoinTable({ name: 'role_menus' })
  role: Roles;
}
