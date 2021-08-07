export const toTagsString = (tags: string[]) =>
  tags.map((e) => "#" + e).join(" ");

export const toAddComma = (str: string) =>
  str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
