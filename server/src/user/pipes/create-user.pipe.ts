import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    if (value.roles && value.roles instanceof Array && value.roles.length > 0) {
      // Roles[]
      if (value.roles[0]['id']) {
        value.roles = value.roles.map((role) => role.id);

        // number[]
      }
      // 🚀 ~ file: create-user.pipe.ts:11 ~ CreateUserPipe ~ transform ~ value: { username: 'ian2124', password: '123456', roles: [ 2 ] }
      console.log(
        '🚀 ~ file: create-user.pipe.ts:11 ~ CreateUserPipe ~ transform ~ value:',
        value,
      );
    }

    return value;
  }
}
