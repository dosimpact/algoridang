import React from 'react';
import { useRecoilState } from 'recoil';
import { atomInspector } from 'states/common/recoil/dashBoard/inspector';
import styled from 'styled-components';
import { IBaseSettingButton } from './BaseSettingButton';

export interface ISelectedTickerButton extends IBaseSettingButton {}
// TODO 로고 변화율
const SelectedTickerButton: React.FC<ISelectedTickerButton> = ({ title }) => {
  const [inspector, setInspector] = useRecoilState(atomInspector);

  const handleClickTicker = () => {
    setInspector((prev) => ({ ...prev, inspectorType: 'tradingSetting' }));
  };

  return (
    <SSelectedTickerButton onClick={handleClickTicker}>
      <div>로고</div>
      <div> {(title && title) || 'title'}</div>
      <div>변화율</div>
    </SSelectedTickerButton>
  );
};

export default SelectedTickerButton;

const SSelectedTickerButton = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  border: 1px solid black;
  padding: 1rem;
  cursor: pointer;
  :hover {
    border: 1px solid red;
  }
`;
