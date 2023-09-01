import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Inject,
  LoggerService,
  Body,
  Param,
  Req,
  Query,
  Headers,
  UseFilters,
  UnauthorizedException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getUserDto } from './dto/get-user.dto';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminGuard } from '../guards/admin.guard';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('user')
@UseFilters(new TypeormFilter())
@UseGuards(JwtGuard)
export class UserController {
  // private logger = new Logger(UserController.name);

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('UserController init');
  }

  // @Get()
  // getUser(): any {
  //   // return this.userService.getUsers();
  //   return 'hello world';
  // }

  @Get()
  // 非常重要的知识点
  // 1. 反复噶装饰器的执行顺序，如果有多个并列，那会从下到上执行
  // @UseGuards(AdminGuard)
  // @UseGuards(AuthGuard('jwt'))
  // 2. 如果使用UseGuard传递多个守卫，则执行顺序是从前往后执行，如果前面的guard没有通过，后面的也不会执行
  @UseGuards(AdminGuard)
  getUsers(@Query() query: getUserDto): any {
    // 前端传递的参数全是 string，需要转换成对应的类型

    // page - 页码 limit - 每页条数  condition - 查询条件（username，role，
    return this.userService.findAll(query);
  }

  @Post()
  addUser(@Body(CreateUserPipe) dto: CreateUserDto): any {
    // todo 解析Body参数
    const user = dto as User;
    // return this.userService.addUser();
    return this.userService.create(user);
  }

  @Patch('/:id')
  updateUser(
    @Body() dto: any,
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    // @Headers('Authorization') headers: any,
  ): any {
    // console.log(
    //   '🚀 ~ file: user.controller.ts ~ line 76 ~ UserController ~ headers',
    //   headers,
    // );
    if (id === parseInt(req.user?.userId)) {
      console.log(123);
      // 说明是同一个用户在修改
      // todo
      // 权限1：判断用户是否是自己
      // 权限2：判断用户是否有更新user的权限
      // 返回数据：不能包含敏感的password等信息
      const user = dto as User;
      return this.userService.update(id, user);
    } else {
      throw new UnauthorizedException();
    }
  }

  // 1. controller 名 vs service 名 vs repository 名 应该怎么取？
  // 2. TypeORM 中的 remove 和 delete 区别是什么？
  @Delete('/:id') // delete 是 RESTful 中的 method
  removeUser(@Param('id') id: number): any {
    // todo 传递参数id
    return this.userService.remove(id);
  }

  @Get('/profile')
  getUserProfile(
    @Query('id', ParseIntPipe) id: any,
    // 这里req中的user是通过AuthGuard('jwt')中的validate方法返回的
    // 准确来说应该是 PassportModule 来添加的
    // @Req() req: any,
  ): any {
    return this.userService.findProfile(id);
  }

  @Get('/logs')
  getUserLogs(): any {
    return this.userService.findUserLogs(2);
  }

  @Get('/logsByGroup')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2);
    // return res.map((o) => ({
    //   result: o.result,
    //   count: o.count,
    // }));
    return res;
  }
}
