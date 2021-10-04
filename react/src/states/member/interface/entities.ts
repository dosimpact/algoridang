import { MemberStrategy } from 'states/strategy/interface/entities';

export enum UserRole {
  Normal = 'Normal',
  Admin = 'Admin',
}

export interface MemberInfo {
  email_id?: string;
  password?: string;
  member_name?: string;
  role?: UserRole;
  // client state
  token?: string;
}

export interface LookupMemberList {
  strategy_code: string;
  strategy: MemberStrategy;
  lookup_customer_id: string;
  lookup_customer: MemberInfo;
}

// NM mapping table
// 전략은 origin과 fork 전략이 같은 table에 공존하고 있음
// 특정 전략을 fork 하면, fork한 사람들을 매핑해주는 매핑 테이블을 만든다.
export interface OperationMemberList {
  strategy_code: string;
  strategy: MemberStrategy;
  operation_customer_id: string;
  operation_customer: MemberInfo;
}
