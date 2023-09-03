/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-31 08:57:02
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-02 18:27:54
 * @FilePath: /nestjs-practices/server/src/auth/auth.strategy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../enum/config.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 注意这里要使用 configService，最好会用 protected 修饰符，这样就只能在当前方法中使用，比较安全
  constructor(protected configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ConfigEnum.SECRET),
    });
  }

  async validate(payload: any) {
    // req.user
    // cache中的token
    return { userId: payload.sub, username: payload.username };
  }
}
