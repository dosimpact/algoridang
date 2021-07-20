import { PickType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreOutput, CorePaginationOutput } from 'src/common/dtos/output.dto';
import { USER } from '../entities/user.entity';

export class LoginUserInput extends PickType(USER, ['EMAIL', 'PASSWORD']) {}

export class LoginUserOutput extends CoreOutput {
  @IsString()
  token?: string;
}

export class MeInput {}

export class MeOutput extends CoreOutput {
  user?: USER;
}

export class GetUserInput extends PickType(USER, ['ID']) {}
export class GetUserOutput extends CoreOutput {
  user?: USER;
}

export class GetUserListInput {}
export class GetUserListOutput extends CorePaginationOutput {
  users?: USER[];
}
