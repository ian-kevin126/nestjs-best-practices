/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-30 08:59:19
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-02 00:44:54
 * @FilePath: /nestjs-practices/server/src/auth/auth.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin-user.dto';
// import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new TypeormFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    const token = await this.authService.signin(username, password);
    // 设置token
    // await this.redis.set(username, token);
    return {
      access_token: token,
    };
  }

  @Post('/signup')
  // @UseInterceptors(SerializeInterceptor)
  signup(@Body() dto: SigninUserDto) {
    const { username, password } = dto;

    // if (!username || !password) {
    //   throw new HttpException('用户名或密码不能为空', 400);
    // }
    // // 正则 -> todo
    // if (typeof username !== 'string' || typeof password !== 'string') {
    //   throw new HttpException('用户名或密码格式不正确', 400);
    // }
    // if (
    //   !(typeof username == 'string' && username.length >= 6) ||
    //   !(typeof password === 'string' && password.length >= 6)
    // ) {
    //   throw new HttpException('用户名密码必须长度超过6', 400);
    // }

    return this.authService.signup(username, password);
  }
}
