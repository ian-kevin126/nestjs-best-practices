/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-09-02 22:10:47
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-02 23:58:43
 * @FilePath: /nestjs-best-practices/server/src/menus/menus.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menus } from './menus.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menus) private menuRepository: Repository<Menus>,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    console.log(
      '🚀 ~ file: menus.service.ts:22 ~ MenusService ~ create ~ createMenuDto:',
      createMenuDto,
    );
    const menu = await this.menuRepository.create(createMenuDto);
    return this.menuRepository.save(menu);
  }

  findAll() {
    return this.menuRepository.find();
  }

  findOne(id: number) {
    return this.menuRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.findOne(id);
    const newMenu = this.menuRepository.merge(menu, updateMenuDto);
    return this.menuRepository.save(newMenu);
  }

  remove(id: number) {
    return this.menuRepository.delete(id);
  }
}
