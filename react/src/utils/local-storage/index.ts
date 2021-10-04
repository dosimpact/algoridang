const select_platform = 'select_platform';

export const getSelectPlatform = () =>
  JSON.parse(localStorage.getItem(select_platform) as string);
export const setSelectPlatform = (data: any) =>
  JSON.stringify(localStorage.setItem(select_platform, data));
