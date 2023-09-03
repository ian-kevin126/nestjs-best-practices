/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-30 08:58:43
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-03 23:17:12
 * @FilePath: /nestjs-practices/server/src/auth/auth.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../enum/config.enum';
import { JwtStrategy } from './auth.strategy';
import { CaslAbilityService } from './casl-ability.service';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // console.log({
        //   secret: configService.get<string>(ConfigEnum.SECRET),
        // });
        return {
          secret: configService.get<string>(ConfigEnum.SECRET),
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, CaslAbilityService],
  controllers: [AuthController],
  exports: [CaslAbilityService],
})
export class AuthModule {}
