import { CoreOutput } from 'states/common/interface/dtos';
import { MemberInfo } from './entities';

// member dtos
export interface MeOutput extends MemberInfo {}

export interface LoginMemberInfoInput {
  email_id: string;
  password: string;
}

export interface LoginMemberInfoOutput {
  token?: string;
}

// ---- mutation

// (1) 사용자 생성
export interface CreateMemberInfoInput
  extends Pick<MemberInfo, 'email_id' | 'member_name' | 'password'> {}

export interface CreateMemberInfoOutput extends CoreOutput {
  memberInfo?: MemberInfo;
}

// (2) 사용자 업데이트
export interface UpdateMemberInfoInput extends Partial<CreateMemberInfoInput> {
  email_id: string;
}

export interface UpdateMemberInfoOutput extends CoreOutput {
  memberInfo?: MemberInfo;
}

// (3) 사용자 삭제

export interface DeleteMemberInfoInput extends Pick<MemberInfo, 'email_id'> {}

export interface DeleteMemberInfoOutput extends CoreOutput {
  memberInfo?: MemberInfo;
}

// (10) 특정 전략을 조회한 회원을 추가한다.
export interface UpsertLookupMemberInput {
  strategy_code: string;
  email_id: string;
}
export interface UpsertLookupMemberOutput extends CoreOutput {}

//(12) 특정 전략을 운용하는 회원을 추가한다.
export interface UpsertOperationMemberInput {
  strategy_code: string;
  email_id: string;
}
export interface UpsertOperationMemberOutput extends CoreOutput {}
