/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-30 08:59:19
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-04 23:08:20
 * @FilePath: /nestjs-best-practices/server/src/auth/__test__/auth.controller.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.entity';
import { Roles } from '../../roles/roles.entity';
import { SigninUserDto } from '../dto/signin-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    // 模拟的AuthService -> 与后续的依赖项UserService等无关联的依赖项
    mockAuthService = {
      signin: (username: string, password: string) => {
        return Promise.resolve('token');
      },
      signup: (username: string, password: string) => {
        const user = new User();
        user.username = username;
        // user.password = password;
        user.roles = [{ id: 1, name: '普通用户' }] as Roles[];
        return Promise.resolve(user);
      },
    };

    // 假设了一个测试模块
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('鉴权-初始化-实例化', () => {
    expect(controller).toBeDefined();
  });

  it('鉴权-控制器-signin注册', async () => {
    const res = controller.signin({
      username: 'test',
      password: '123456',
    } as SigninUserDto);
    expect(await res).not.toBeNull();
    expect((await res).access_token).toBe('token');
  });

  it('鉴权-控制器-signup注册', async () => {
    const res = controller.signup({
      username: 'test',
      password: '123456',
    } as SigninUserDto);
    expect(await res).not.toBeNull();
    expect((await res).id).not.toBeNull();
    expect((await res).password).toBeUndefined();
    expect((await res) instanceof User).toBeTruthy();

    expect((await res).username).toBe('test');
    expect((await res).roles.length).toBeGreaterThan(0);
  });
});
