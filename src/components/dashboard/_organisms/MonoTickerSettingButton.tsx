import { IconArrowRight } from 'assets/icons';
import produce from 'immer';
import React, { useEffect, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useMiniBacktest, {
  miniBacktestAdaptor,
} from 'states/backtest/query/useMiniBacktest';
import {
  atomInspector,
  atomUniversalSettingStateIdx,
  selectedUniversalSetting_R,
} from 'states/strategy/recoil/strategy-create';
import styled from 'styled-components';
import { IBaseSettingButton } from './BaseSettingButton';
interface IMonoTickerSettingButton extends IBaseSettingButton {}

// 대시보드 (col-2) : 개별 종목 매매전략 설정 및 매매전략상세설정 button
const MonoTickerSettingButton: React.FC<IMonoTickerSettingButton> = ({
  title,
  selectedIndex,
}) => {
  const thisUnivIdx = selectedIndex;

  const [inspector, setInspector] = useRecoilState(atomInspector);
  const [currentUnivIdx, setCurrentUnivIdx] = useRecoilState(
    atomUniversalSettingStateIdx,
  );
  const thisUnivSetting = useRecoilValue(
    selectedUniversalSetting_R({ universalIdx: thisUnivIdx }),
  );

  // 티커를 클릭했을때,
  const handleClickTicker = () => {
    // 인스펙터를 변화
    setInspector((prev) =>
      produce(prev, (draft) => {
        draft.inspectorType = 'tradingSetting';
        draft.inspectorState.tradingSetting = {
          tab: prev.inspectorState.tradingSetting.tab,
          // selectedIndex: -1,
        };
        return draft;
      }),
    );
    setCurrentUnivIdx(thisUnivIdx);
  };

  //
  const handleClickTradingSetting = () => {
    setInspector((prev) =>
      produce(prev, (draft) => {
        draft.inspectorType = 'tradingPropertySetting';
        // draft.inspectorState.tradingPropertySetting = {
        //   selectedIndex,
        // };
        return draft;
      }),
    );
    setCurrentUnivIdx(selectedIndex);
  };

  const { reqMiniBTMutation } = useMiniBacktest();

  const handleRequestMiniBT = async () => {
    if (thisUnivSetting && thisUnivSetting.selectedTechnical) {
      reqMiniBTMutation.mutate(
        miniBacktestAdaptor({
          selectedCorporations: thisUnivSetting.selectedCorporations,
          selectedTechnical: thisUnivSetting.selectedTechnical,
        }),
      );
    }
  };
  // 조건이 만족되면 ~ miniBacktesting
  useEffect(() => {
    const requestMiniBT = async () => {
      if (thisUnivSetting && thisUnivSetting.selectedTechnical) {
        reqMiniBTMutation.mutate(
          miniBacktestAdaptor({
            selectedCorporations: thisUnivSetting.selectedCorporations,
            selectedTechnical: thisUnivSetting.selectedTechnical,
          }),
        );
      }
    };
    requestMiniBT();
    return () => {};
  }, [
    thisUnivSetting?.selectedTechnical?.setting_json,
    thisUnivSetting?.selectedTechnical?.trading_strategy_name,
  ]);

  const { isSuccess, isError, isLoading, isIdle } = reqMiniBTMutation;
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
        {thisUnivSetting &&
        thisUnivSetting.selectedTechnical?.trading_strategy_name
          ? `${thisUnivSetting.selectedTechnical?.trading_strategy_name}`
          : '전략상세설정'}
      </div>
      <div className="settingListItem">
        <IconArrowRight />
      </div>
      <div className="settingListItem" onClick={handleRequestMiniBT}>
        {isLoading && 'loading...'}
        {!isLoading && isError && 'Error'}
        {!isLoading &&
          isSuccess &&
          reqMiniBTMutation.data &&
          reqMiniBTMutation.data.data.res && (
            <div>
              <div>
                연수익 :{' '}
                {Number(
                  reqMiniBTMutation.data.data.res.year_avg_profit_rate * 100,
                ).toFixed(1)}
                %
              </div>
              <div>
                최대낙폭 :{' '}
                {Number(reqMiniBTMutation.data.data.res.mdd * 100).toFixed(1)}%
              </div>
            </div>
          )}
        {isIdle && '모의테스트'}
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
    text-align: center;
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
