export const toTagsString = (tags: string[]) =>
  tags.map((e) => "#" + e).join(" ");
