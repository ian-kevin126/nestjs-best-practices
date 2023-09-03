import { AnyMongoAbility, InferSubjects } from '@casl/ability';
import { SetMetadata } from '@nestjs/common';
import { Action } from '../enum/action.enum';

/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-09-03 22:57:53
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-03 23:13:20
 * @FilePath: /nestjs-best-practices/server/src/decorators/casl.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export enum CHECK_POLICIES_KEY {
  HANDLER = 'CHECK_POLICIES_HANDLER',
  CAN = 'CHECK_POLICIES_CAN',
  CANNOT = 'CHECK_POLICIES_CANNOT',
}

export type PolicyHandlerCallback = (ability: AnyMongoAbility) => boolean;

export type CaslHandlerType = PolicyHandlerCallback | PolicyHandlerCallback[];

// GUARDS ——> routes meta -> @CheckPolicies @Can @Cannot

// @CheckPolicies -> handler -> ability => boolean
export const CheckPolices = (...handlers: PolicyHandlerCallback[]) =>
  SetMetadata(CHECK_POLICIES_KEY.HANDLER, handlers);

// @Can -> Action, Subject, Conditions
export const Can = (
  action: Action,
  subject: InferSubjects<any>,
  conditions?: any,
) =>
  SetMetadata(CHECK_POLICIES_KEY.CAN, (ability: AnyMongoAbility) =>
    ability.can(action, subject, conditions),
  );

// @Cannot -> Action, Subject, Conditions
export const Cannot = (
  action: Action,
  subject: InferSubjects<any>,
  conditions?: any,
) =>
  SetMetadata(CHECK_POLICIES_KEY.CANNOT, (ability: AnyMongoAbility) =>
    ability.cannot(action, subject, conditions),
  );
