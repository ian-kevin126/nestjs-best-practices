/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-27 23:25:40
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-07 21:00:40
 * @FilePath: /nestjs-best-practices/server/test/app.e2e-spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from '../src/app.module';
// import { setupApp } from '../src/setup';
// import { AppFactory } from './app.factory';
// import * as pactum from 'pactum';
import * as Spec from 'pactum/src/models/Spec';

describe('AppController (e2e)', () => {
  // let app: INestApplication;
  let spec;
  beforeEach(() => {
    // console.log('app', global.app);
    // pactum.request.setBaseUrl('http://localhost:3000');
    spec = global.pactum as Spec;
  });

  it('/ (GET)', () => {
    // baseURL + port
    // return request(app.getHttpServer())
    //   .get('/api/v1/auth')
    //   .expect(200)
    //   .expect('Hello World!');
    return spec
      .get('/api/v1/auth')
      .expectStatus(200)
      .expectBodyContains('hello world');
  });
});
