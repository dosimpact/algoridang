import { PickType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CorePaginationInput } from 'src/common/dtos/input.dto';
import { CoreOutput, CorePaginationOutput } from 'src/common/dtos/output.dto';
import { LookupMemberList, MemberInfo, OperationMemberList } from '../entities';

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
export class GetMemberInfoListInput extends CorePaginationInput {}
export class GetMemberInfoListOutput extends CorePaginationOutput {
  memberInfoList?: MemberInfo[];
}

// () 전략 운용 회원 매핑 테이블 도회
export class GetOperationMemberListInput {
  strategy_code: string;
  operation_customer_id: string;
}
export class GetOperationMemberListOutput extends CoreOutput {
  operationMemberList?: OperationMemberList[];
}

// () 조회 회원 매핑 테이블 도회
export class GetLookupMemberListInput {
  strategy_code: string;
  lookup_customer_id: string;
}
export class GetLookupMemberListOutput extends CoreOutput {
  lookupMemberList?: LookupMemberList[];
}
