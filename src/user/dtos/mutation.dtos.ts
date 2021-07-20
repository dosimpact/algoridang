import { PickType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { USER } from '../entities/user.entity';

export class CreateUserInput extends PickType(USER, [
  'EMAIL',
  'NAME',
  'PASSWORD',
]) {}

export class CreateUserOutput extends CoreOutput {
  user?: USER;
}

export class UpdateUserInput extends PartialType(CreateUserInput) {}

export class UpdateUserOutput extends CoreOutput {
  user?: USER;
}

export class DeleteUserInput extends PickType(USER, ['ID']) {}

export class DeleteUserOutput extends CoreOutput {
  user?: USER;
}
