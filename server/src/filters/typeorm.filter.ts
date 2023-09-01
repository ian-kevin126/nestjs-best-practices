/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-29 09:33:30
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-08-30 23:06:39
 * @FilePath: /nestjs-practices/server/src/filters/typeorm.filter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';

// 这里要传递 TypeORMError，否则会接收不到报错
@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    let code = 500;

    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno;
    }

    // 响应请求对象
    const response = ctx.getResponse();

    // 响应给前端
    response.status(500).json({
      code,
      timestamp: new Date().toISOString(),
      // path: request.url,
      // method: request.method,
      message: exception.message,
    });
  }
}
