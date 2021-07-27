import { MemberInfo } from "./entities";

// member dtos
export interface meOutput extends MemberInfo {}

export interface loginMemberInfoInput {
  email_id: string;
  password: string;
}

export interface loginMemberInfoOutput {
  token?: string;
}
