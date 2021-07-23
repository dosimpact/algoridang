import { PickType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreOutput, CorePaginationOutput } from 'src/common/dtos/output.dto';
import { MemberInfo } from '../entities';

// (1) 로그인
export class LoginMemberInfoInput extends PickType(MemberInfo, [
  'email_id',
  'password',
]) {}

export class LoginMemberInfoOutput extends CoreOutput {
  @IsString()
  token?: string;
}

// (2) 나의 정보
export class MeInput {}

export class MeOutput extends CoreOutput {
  memberInfo?: MemberInfo;
}

// (3) 사용자 정보 email 검색
export class GetMemberInfoInput extends PickType(MemberInfo, ['email_id']) {}
export class GetMemberInfoOutput extends CoreOutput {
  memberInfo?: MemberInfo;
}

// (4) 사용자 리스트 출력
export class GetMemberInfoListInput {}
export class GetMemberInfoListOutput extends CorePaginationOutput {
  memberInfos?: MemberInfo[];
}
