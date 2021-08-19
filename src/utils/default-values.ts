export const randomDefaultThunmnail = (title: string) => {
  const idx = title.length % 4;
  if (idx === 0)
    return "https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272438714d_thumb01.jpeg";
  if (idx === 1)
    return "https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272493836d_thumb02.png";
  if (idx === 2)
    return "https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272499339d_thumb03.jpeg";
  if (idx === 3)
    return "https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272503198d_thumb04.png";
  return "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";
};
