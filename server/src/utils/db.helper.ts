import { SelectQueryBuilder } from 'typeorm';

/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-29 00:14:41
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-08-29 00:17:08
 * @FilePath: /nestjs-practices/server/src/utils/db.helper.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const conditionUtils = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  obj: Record<string, unknown>,
) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      // 这里 : 后面的key只要和后面{}中的key对应就行，因为只是个映射，不需要写成username，写成user.username也可以
      //   queryBuilder.andWhere('profile.gender = :gender111', { gender111: gender });
      queryBuilder.andWhere(`${key} = :${key}`, { [key]: obj[key] });
    }
  });

  return queryBuilder;
};
