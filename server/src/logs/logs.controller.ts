/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-27 23:25:40
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-02 00:59:21
 * @FilePath: /nestjs-practices/server/src/logs/logs.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtGuard } from 'src/guards/jwt.guard';
// import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { Serialize } from '../decorators/serialize.decorator';

class LogsDto {
  @IsString()
  @IsNotEmpty()
  msg: string;

  @IsString()
  id: string;

  @IsString()
  name: string;
}

// 返回数据的格式
class PublicLogsDto {
  @Expose()
  msg: string;

  @Expose()
  name: string;
}

@Controller('logs')
@UseGuards(JwtGuard, AdminGuard)
export class LogsController {
  @Get()
  getTest() {
    return 'test';
  }

  @Post()
  @Serialize(PublicLogsDto)
  // @UseInterceptors(new SerializeInterceptor(PublicLogsDto))
  postTest(@Body() dto: LogsDto) {
    console.log(
      '🚀 ~ file: logs.controller.ts:23 ~ LogsController ~ postTest ~ dto:',
      dto,
    );
    return dto;
  }
}
