/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-27 23:25:40
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-05 08:49:32
 * @FilePath: /nestjs-best-practices/server/src/app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Global, Logger, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionParams } from '../ormconfig';

import { LogsModule } from './logs/logs.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { MenusModule } from './menus/menus.module';

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

console.log('🚀 ~ file: app.module.ts:24 ~ envFilePath:', envFilePath);

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        DB_PORT: Joi.number().default(3306),
        DB_HOST: Joi.alternatives().try(
          Joi.string().ip(),
          Joi.string().domain(),
        ),
        DB_TYPE: Joi.string().valid('mysql', 'postgres'),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
        LOG_ON: Joi.boolean(),
        LOG_LEVEL: Joi.string(),
      }),
    }),
    TypeOrmModule.forRoot(connectionParams),
    UserModule,
    LogsModule,
    RolesModule,
    AuthModule,
    MenusModule,
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}
