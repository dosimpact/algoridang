// import { PickType, PartialType } from '@nestjs/graphql';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNumber, IsString } from 'class-validator';
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

// (10) 특정 전략을 조회한 회원을 추가한다.
export class UpsertLookupMemberInput {
  @IsString()
  strategy_code: string;
  @IsEmail()
  email_id: string;
}
export class UpsertLookupMemberOutput extends CoreOutput {}

//(12) 특정 전략을 운용하는 회원을 추가한다.
export class UpsertOperationMemberInput {
  @IsString()
  strategy_code: string;
  @IsEmail()
  email_id: string;
}
export class UpsertOperationMemberOutput extends CoreOutput {}
