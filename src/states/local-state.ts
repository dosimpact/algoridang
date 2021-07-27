import { MemberInfo } from "./common/entities";

export enum IItemsKeys {
  memberInfo = "memberInfo",
}

export const getLocalMemberInfo = () =>
  JSON.parse(localStorage.getItem(IItemsKeys.memberInfo) || "{}") as MemberInfo;

export const setLocalMemberInfo = (memberInfo: MemberInfo) =>
  localStorage.setItem(IItemsKeys.memberInfo, JSON.stringify(memberInfo));
