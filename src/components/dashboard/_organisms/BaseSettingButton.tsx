import React from 'react';

export interface IBaseSettingButton {
  title?: string;
  selectedIndex: number; // atomUniversalSettingState 배열 인덱스
}

const BaseSettingButton: React.FC<IBaseSettingButton> = () => {
  return <div></div>;
};

export default BaseSettingButton;
