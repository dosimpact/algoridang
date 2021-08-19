import { HashList } from "states/interface/strategy/entities";

export const hashListToString = (hashs: HashList[]) => {
  return hashs
    .map((h) => (h?.hash?.hash_contents ? `#${h?.hash?.hash_contents}` : ""))
    .join(" ");
};
export const toTagsString = (tags: string[]) =>
  tags.map((e) => "#" + e).join(" ");

export const toAddComma = (str: string) =>
  str && str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

export const UTCtoDate = (str: string) => str.slice(0, 10);

export const toPercentage = (str: string | number) => {
  if (typeof str === "string") str = Number(str);
  return Math.round(str * 100);
};
export const toRatio = (a: string | number, b: string | number) => {
  if (typeof a === "string") a = Number(a);
  if (typeof b === "string") b = Number(b);
  return (a / b).toFixed(3);
};
