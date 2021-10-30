import { IconArrowRight, IconCheckCircle } from 'assets/icons';
import BadgeCAGR from 'components/common/_atoms/BadgeCAGR';
import DisplayPercentage from 'components/common/_atoms/DisplayPercentage';
import RoundBadge from 'components/common/_atoms/RoundBadge';
import produce from 'immer';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useMiniBacktest, {
  miniBacktestAdaptor,
} from 'states/backtest/query/useMiniBacktest';
import {
  atomUniversalSettingStateIdx,
  selectedUniversalSetting_R,
} from 'states/common/recoil/dashBoard/dashBoard';
import {
  atomInspector,
  selectorInspectorType,
} from 'states/common/recoil/dashBoard/inspector';
import styled from 'styled-components';
import { IBaseSettingButton } from './BaseSettingButton';
interface IMonoTickerSettingButton extends IBaseSettingButton {}

// 대시보드 (col-2) : 개별 종목 매매전략 설정 및 매매전략상세설정 button
const MonoTickerSettingButton: React.FC<IMonoTickerSettingButton> = ({
  title,
  selectedIndex,
}) => {
  const thisUnivIdx = selectedIndex;

  const [, setInspector] = useRecoilState(atomInspector);
  const [, setCurrentUnivIdx] = useRecoilState(atomUniversalSettingStateIdx);
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
          ...draft.inspectorState.tradingSetting,
          tab: prev.inspectorState.tradingSetting.tab,
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
        return draft;
      }),
    );
    setCurrentUnivIdx(thisUnivIdx);
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
  const [, handleChangeInspector] = useRecoilState(selectorInspectorType);

  return (
    <SMonoTickerSettingButton>
      <div
        className="settingListItem item_title"
        onClick={() => {
          handleChangeInspector('universalSetting');
        }}
      >
        {title}
      </div>
      <div className="settingListItem">
        <IconArrowRight />
      </div>

      <div className="settingListItem" onClick={handleClickTicker}>
        {thisUnivSetting &&
        thisUnivSetting.selectedTechnical?.trading_strategy_name
          ? `${thisUnivSetting.selectedTechnical?.trading_strategy_name}`
          : '전략상세설정'}
      </div>
      <div className="settingListItem">
        <IconArrowRight />
      </div>
      <div
        className="settingListItem item_btResult"
        onClick={handleClickTradingSetting}
      >
        {isLoading && '전략분석중...'}
        {!isLoading && isError && 'Error'}
        {!isLoading &&
          isSuccess &&
          reqMiniBTMutation.data &&
          reqMiniBTMutation.data.data.res && (
            <div className="btResult_List">
              <div className="btResult_item">
                <span>연수익 </span>
                <DisplayPercentage
                  val={reqMiniBTMutation.data.data.res.year_avg_profit_rate}
                />
              </div>
              <div className="btResult_item">
                <span>최대낙폭 </span>
                <DisplayPercentage val={reqMiniBTMutation.data.data.res.mdd} />
              </div>
            </div>
          )}
        {isIdle && '모의테스트'}
      </div>
      {thisUnivSetting &&
      thisUnivSetting.selectedTechnical?.trading_strategy_name ? (
        <span className="settingCompleteIcon">
          <IconCheckCircle />
        </span>
      ) : (
        ''
      )}
    </SMonoTickerSettingButton>
  );
};

export default MonoTickerSettingButton;

const SMonoTickerSettingButton = styled.section`
  display: grid;
  grid-template-columns: 1fr 3rem 1fr 3rem 1fr;
  border-radius: 0.4rem;
  border: 1px solid ${(props) => props.theme.ColorMainLightGray};
  cursor: pointer;
  height: 10rem;
  margin-bottom: 0.5rem;

  position: relative;
  :hover {
    border: 1px solid ${(props) => props.theme.ColorMainBlue};
  }
  .settingCompleteIcon {
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    z-index: 10;
    svg {
      fill: ${(props) => props.theme.ColorMainGreen};
    }
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
    background-color: ${(props) => props.theme.ColorMainLightBlue};
  }
  .settingListItem:nth-child(3):hover {
    background-color: ${(props) => props.theme.ColorMainLightBlue};
  }
  .settingListItem:nth-child(5):hover {
    background-color: ${(props) => props.theme.ColorMainLightBlue};
  }

  .item_btResult {
    line-height: 2rem;
    text-align: start;
    .btResult_List {
      .btResult_item {
      }
    }
  }
`;
