import { HashList } from 'states/strategy/interface/entities';

export const hashListToString = (hashs: HashList[]) => {
  return hashs
    .map((h) => (h?.hash?.hash_contents ? `#${h?.hash?.hash_contents}` : ''))
    .join(' ');
};
export const toTagsString = (tags: string[]) =>
  tags.map((e) => (e.length === 0 ? '' : '#' + e)).join(' ') || '';

export const toAddComma = (str: string) =>
  str && str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

export const UTCtoDate = (str: string) => str.slice(0, 10);

export const toPercentage = (str: string | number) => {
  if (typeof str === 'string') str = Number(str);
  return Math.round(str * 100);
};
export const toRatio = (a: string | number, b: string | number) => {
  if (typeof a === 'string') a = Number(a);
  if (typeof b === 'string') b = Number(b);
  return (a / b).toFixed(3);
};

export const toTickerImage = (code: number | string) => {
  return `${process.env.REACT_APP_S3_URL}/ticker/${code}.jpg`;
};

export const RemoveMultipleElements = (
  valuesArr: any[],
  removeValFrom: number[],
) => {
  const copyiedValuesArr = [...valuesArr];
  removeValFrom.sort((a, b) => b - a);

  for (let idx of removeValFrom) {
    copyiedValuesArr.splice(idx, 1);
  }
  return copyiedValuesArr;
};

const oneDay = 1000 * 60 * 60 * 24;
export const getTodayDiff = (t1: string) => {
  return Math.floor((new Date().getTime() - new Date(t1).getTime()) / oneDay);
};
