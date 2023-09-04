/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-27 23:25:40
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-04 08:59:14
 * @FilePath: /nestjs-best-practices/server/src/user/__tests__/user.service.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from '../user.service';

describe('UserService', () => {
  // let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // providers: [UserService],
    }).compile();

    // service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});
