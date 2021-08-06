import { MemberInfo } from "./entities";

// member dtos
export interface MeOutput extends MemberInfo {}

export interface LoginMemberInfoInput {
  email_id: string;
  password: string;
}

export interface LoginMemberInfoOutput {
  token?: string;
}
