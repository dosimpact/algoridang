// import { PickType, PartialType } from '@nestjs/graphql';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsEmail } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MemberInfo } from '../entities';

// (1) 사용자 생성
export class CreateMemberInfoInput extends PickType(MemberInfo, [
  'email_id',
  'member_name',
  'password',
]) {}

export class CreateMemberInfoOutput extends CoreOutput {
  memberInfo?: MemberInfo;
}

// (2) 사용자 업데이트
export class UpdateMemberInfoInput extends PartialType(CreateMemberInfoInput) {
  @IsEmail()
  email_id: string;
}

export class UpdateMemberInfoOutput extends CoreOutput {
  memberInfo?: MemberInfo;
}

// (3) 사용자 삭제

export class DeleteMemberInfoInput extends PickType(MemberInfo, ['email_id']) {}

export class DeleteMemberInfoOutput extends CoreOutput {
  memberInfo?: MemberInfo;
}
