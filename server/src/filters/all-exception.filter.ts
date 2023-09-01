/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-29 09:07:39
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-08-29 09:40:57
 * @FilePath: /nestjs-practices/server/src/filters/all-exception.filter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  ExceptionFilter,
  HttpAdapterHost,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { ArgumentsHost, Catch } from '@nestjs/common';

import * as requestIp from 'request-ip';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 加入更多异常错误逻辑
    const msg: string = exception['response'] || 'Internal Server Error';
    // if (exception instanceof QueryFailedError) {
    //   msg = exception.message;
    //   // if (exception.driverError.errno === 1062) {
    //   //   msg = '唯一索引冲突';
    //   // }
    // }

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toISOString(),
      // 还可以加入一些用户信息
      // IP信息
      ip: requestIp.getClientIp(request),
      exceptioin: exception['name'],
      // error: exception['response'] || 'Internal Server Error',
      error: msg,
    };

    this.logger.error('[toimc]', responseBody);
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
