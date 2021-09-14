import produce from 'immer';
import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import {
  atomInspector,
  atomUniversalSettingState,
} from 'states/recoil/strategy-create';
import styled from 'styled-components';

interface IMonoTickerSettingButton {
  title?: string;
  selectedIndex: number; // atomUniversalSettingState 배열 인덱스
}

// 대시보드 (col-2) : 개별 종목 매매전략 설정 및 매매전략상세설정 button
const MonoTickerSettingButton: React.FC<IMonoTickerSettingButton> = ({
  children,
  title,
  selectedIndex,
}) => {
  const [inspector, setInspector] = useRecoilState(atomInspector);

  const [universals] = useRecoilState(atomUniversalSettingState);

  const currentUniversal = useMemo(() => {
    if (universals && selectedIndex < universals.selected.length)
      return universals.selected[selectedIndex];
  }, [universals, selectedIndex]);

  const handleClickTicker = () => {
    setInspector((prev) =>
      produce(prev, (draft) => {
        draft.inspectorType = 'tradingSetting';
        draft.inspectorState.tradingSetting = {
          tab: 0,
          selectedIndex,
        };
        return draft;
      }),
    );
  };

  const handleClickTradingSetting = () => {
    setInspector((prev) =>
      produce(prev, (draft) => {
        draft.inspectorType = 'tradingPropertySetting';
        draft.inspectorState.tradingPropertySetting = {
          selectedIndex,
        };
        return draft;
      }),
    );
  };

  return (
    <SMonoTickerSettingButton>
      <div onClick={handleClickTicker}>{title}</div>
      <div>{' > '}</div>
      <div onClick={handleClickTradingSetting}>
        {currentUniversal &&
        currentUniversal.selectedTechnical?.trading_strategy_name
          ? `${currentUniversal.selectedTechnical?.trading_strategy_name}`
          : '매매전략선택'}
      </div>
    </SMonoTickerSettingButton>
  );
};

export default MonoTickerSettingButton;

const SMonoTickerSettingButton = styled.section`
  display: grid;
  grid-template-columns: 1fr 0.3fr 1fr;
  border: 1px solid black;
  cursor: pointer;
  min-height: 5rem;

  :hover {
    border: 1px solid red;
  }
`;
