/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-27 23:25:40
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-07 20:56:13
 * @FilePath: /nestjs-practices/server/src/enum/config.enum.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export enum ConfigEnum {
  DB_TYPE = 'DB_TYPE',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_DATABASE = 'DB_DATABASE',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_SYNC = 'DB_SYNC',

  SECRET = 'SECRET',

  REDIS_HOST = 'REDIS_HOST',
  REDIS_PORT = 'REDIS_PORT',
  REDIS_PASSWORD = 'REDIS_PASSWORD',
  REDIS_RECONNECT = 'REDIS_RECONNECT',
}

export enum LogEnum {
  LOG_LEVEL = 'LOG_LEVEL',
  LOG_ON = 'LOG_ON',
  TIMESTAMP = 'TIMESTAMP',
}
