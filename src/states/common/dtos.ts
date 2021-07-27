import { MemberInfo } from "./entities";

export interface CoreOutput {
  ok: boolean;
  error?: string;
}

// member dtos
export interface meOutput extends MemberInfo {}

export interface loginMemberInfo {
  email_id: string;
  password: string;
}
