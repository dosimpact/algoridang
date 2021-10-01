import { IconArrowRight } from 'assets/icons';
import produce from 'immer';
import React, { useMemo, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useMiniBacktest, {
  miniBacktestAdaptor,
} from 'states/backtest/query/useMiniBacktest';
import {
  atomInspector,
  atomUniversalSettingState,
  atomUniversalSettingStateIdx,
} from 'states/strategy/recoil/strategy-create';
import styled from 'styled-components';
import { IBaseSettingButton } from './BaseSettingButton';

interface IMonoTickerSettingButton extends IBaseSettingButton {}

// 대시보드 (col-2) : 개별 종목 매매전략 설정 및 매매전략상세설정 button
const MonoTickerSettingButton: React.FC<IMonoTickerSettingButton> = ({
  children,
  title,
  selectedIndex,
}) => {
  const [inspector, setInspector] = useRecoilState(atomInspector);

  const [universals] = useRecoilState(atomUniversalSettingState);
  const [currentUnivIdx, setCurrentUnivIdx] = useRecoilState(
    atomUniversalSettingStateIdx,
  );

  const currentUniversal = useMemo(() => {
    if (universals && selectedIndex < universals.selected.length)
      return universals.selected[selectedIndex];
  }, [universals, selectedIndex]);

  // 티커를 클릭했을때,
  const handleClickTicker = () => {
    // 인스펙터를 변화
    setInspector((prev) =>
      produce(prev, (draft) => {
        draft.inspectorType = 'tradingSetting';
        draft.inspectorState.tradingSetting = {
          tab: prev.inspectorState.tradingSetting.tab,
          selectedIndex,
        };
        return draft;
      }),
    );
    setCurrentUnivIdx(selectedIndex);
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
    setCurrentUnivIdx(selectedIndex);
  };

  console.log('currentUniversal', currentUniversal);

  const { reqMiniBTMutation } = useMiniBacktest();

  const handleRequestMiniBT = async () => {
    console.log('handleRequestMiniBT');

    if (currentUniversal && currentUniversal.selectedTechnical) {
      reqMiniBTMutation.mutate(
        miniBacktestAdaptor({
          selectedCorporations: currentUniversal.selectedCorporations,
          selectedTechnical: currentUniversal.selectedTechnical,
        }),
      );
    }
  };
  // 조건이 만족되면 ~ miniBacktesting
  useEffect(() => {
    handleRequestMiniBT();
    return () => {};
  }, []);

  console.log('reqMiniBTMutation.data?.data', reqMiniBTMutation.data?.data);

  return (
    <SMonoTickerSettingButton>
      <div className="settingListItem" onClick={handleClickTicker}>
        {title}
      </div>
      <div className="settingListItem">
        <IconArrowRight />
      </div>

      <div className="settingListItem" onClick={handleClickTradingSetting}>
        {currentUniversal &&
        currentUniversal.selectedTechnical?.trading_strategy_name
          ? `${currentUniversal.selectedTechnical?.trading_strategy_name}`
          : '전략상세설정'}
      </div>
      <div className="settingListItem">
        <IconArrowRight />
      </div>
      <div className="settingListItem" onClick={handleRequestMiniBT}>
        미니 백테스팅
      </div>
    </SMonoTickerSettingButton>
  );
};

export default MonoTickerSettingButton;

const SMonoTickerSettingButton = styled.section`
  display: grid;
  grid-template-columns: 1fr 3rem 1fr 3rem 1fr;
  /* justify-content: center; */
  /* align-content: center; */

  border: 1px solid ${(props) => props.theme.ColorMainLightGray};
  cursor: pointer;
  height: 8rem;
  margin-bottom: 0.5rem;
  :hover {
    border: 1px solid ${(props) => props.theme.ColorMainBlue};
  }
  svg {
    fill: ${(props) => props.theme.ColorMainLightGray};
  }
  .settingListItem {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .settingListItem:nth-child(1):hover {
    background-color: ${(props) => props.theme.ColorMainLightGreen};
  }
  .settingListItem:nth-child(3):hover {
    background-color: ${(props) => props.theme.ColorMainLightBlue};
  }
  .settingListItem:nth-child(5):hover {
    background-color: ${(props) => props.theme.ColorMainLightRed};
  }
`;
