export const toTagsString = (tags: string[]) =>
  tags.map((e) => "#" + e).join(" ");

export const toAddComma = (str: string) =>
  str && str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

export const UTCtoDate = (str: string) => str.slice(0, 10);
