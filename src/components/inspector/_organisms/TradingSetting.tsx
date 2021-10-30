import React from 'react';
import WingBlank from 'components/common/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import styled from 'styled-components';
import { IInspectorSettings } from '.';
import TradingSettingTabTechnicalSearch from './TradingSettingTabTechnicalSearch';
import TradingSettingTabQuantSearch from './TradingSettingTabQuantSearch';

interface ITradingSetting extends IInspectorSettings {}

const TradingSetting: React.FC<ITradingSetting> = ({ headerTitle }) => {
  return (
    <STradingSetting>
      <InspectorHeaderDetail
        headerTitle={headerTitle || '매매 전략 설정'}
        toolTip="사고 파는 방법을 설정합니다. 전략발굴탭에서 높은 수익률을 확인해 보세요"
      />
      <WingBlank>
        <>
          <TradingSettingTabTechnicalSearch />
          <TradingSettingTabQuantSearch />
        </>
      </WingBlank>
    </STradingSetting>
  );
};

export default TradingSetting;

const STradingSetting = styled.section`
  /* .tabContainer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    cursor: pointer;
    & div:first-child {
      border-top-left-radius: 0.6rem;
      border-bottom-left-radius: 0.6rem;
    }
    & div:last-child {
      border-top-right-radius: 0.6rem;
      border-bottom-right-radius: 0.6rem;
    }
  } */
`;

const StabItem = styled.div<{ selected?: boolean }>`
  min-height: 6rem;
  background-color: ${(props) =>
    props.selected ? props.theme.ColorMainYellow : props.theme.ColorWhite};
  color: ${(props) =>
    props.selected ? props.theme.ColorWhite : props.theme.ColorDark};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
`;
