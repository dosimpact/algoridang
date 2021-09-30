import { IconArrowRight } from 'assets/icons';
import produce from 'immer';
import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import {
  atomInspector,
  atomUniversalSettingState,
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

  const currentUniversal = useMemo(() => {
    if (universals && selectedIndex < universals.selected.length)
      return universals.selected[selectedIndex];
  }, [universals, selectedIndex]);

  const handleClickTicker = () => {
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
      <div className="settingListItem" onClick={handleClickTicker}>
        {title}
      </div>
      <IconArrowRight />
      <div className="settingListItem" onClick={handleClickTradingSetting}>
        {currentUniversal &&
        currentUniversal.selectedTechnical?.trading_strategy_name
          ? `${currentUniversal.selectedTechnical?.trading_strategy_name}`
          : '매매전략선택'}
      </div>
      <IconArrowRight />
      <div className="settingListItem">미니 백테스팅</div>
    </SMonoTickerSettingButton>
  );
};

export default MonoTickerSettingButton;

const SMonoTickerSettingButton = styled.section`
  display: grid;
  grid-template-columns: 1fr 3rem 1fr 3rem 1fr;
  justify-content: center;
  align-content: center;

  border: 1px solid ${(props) => props.theme.ColorMainLightGray};
  cursor: pointer;
  height: 8rem;

  :hover {
    border: 1px solid ${(props) => props.theme.ColorMainLightBlue};
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
`;
