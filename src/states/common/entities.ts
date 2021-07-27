export enum UserRole {
  Normal = "Normal",
  Admin = "Admin",
}

export interface MemberInfo {
  email_id?: string;
  password?: string;
  member_name?: string;
  role?: UserRole;
  token?: string;
}
