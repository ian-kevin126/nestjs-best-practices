/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-27 23:25:40
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-04 08:58:30
 * @FilePath: /nestjs-best-practices/server/src/logs/__tests__/logs.service.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Test, TestingModule } from '@nestjs/testing';
// import { LogsService } from '../logs.service';

describe('LogsService', () => {
  // let service: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // providers: [LogsService],
    }).compile();

    // service = module.get<LogsService>(LogsService);
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});
