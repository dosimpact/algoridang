import WingBlank from 'components/common/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import produce from 'immer';
import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  atomUniversalSettingStateIdx,
  selectedUniversalSetting_R,
} from 'states/common/recoil/dashBoard/dashBoard';
import styled from 'styled-components';
import { IInspectorSettings } from '.';
import TechnicalSearch from 'components/common/_atoms/TechnicalSearch';
import { useTechnicals } from 'states/trading/query/useTechnicals';
// import { useRequestMiniBacktesting } from 'states/trading/query/useRequestMiniBacktesting';
import {
  BaseTradingStrategy,
  StrategyName,
} from 'states/trading/interface/entities';
import WideLine from 'components/common/_atoms/WideLine';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import { Button } from 'components/common/_atoms/Buttons';
import { atomInspector } from 'states/common/recoil/dashBoard/inspector';
import useMiniBacktest from 'states/backtest/query/useMiniBacktest';

interface ITechnicalStrategyList {
  onSelect?: (e: BaseTradingStrategy) => void;
}
// - 매매 전략 리스트 랜더링
// -- 매매 전략 클릭시 해당 객체 onSelect(callback)
const TechnicalStrategyList: React.FC<ITechnicalStrategyList> = ({
  onSelect,
}) => {
  const { GetTechnicalStrategyListQuery } = useTechnicals();

  return (
    <STechnicalStrategyList>
      {GetTechnicalStrategyListQuery.isLoading && 'loading...'}
      {!GetTechnicalStrategyListQuery.isLoading && (
        <ul className="strategyList">
          {GetTechnicalStrategyListQuery.data?.map((st, idx) => {
            if (st.trading_strategy_name === 'None') {
              return <></>;
            }
            return (
              <Button
                type="blue"
                className="strategyListItem"
                key={`${idx}-${st.trading_strategy_name}`}
                onClick={() => {
                  if (onSelect) onSelect(st);
                }}
              >
                {st.trading_strategy_name}
              </Button>
            );
          })}
        </ul>
      )}
    </STechnicalStrategyList>
  );
};
const STechnicalStrategyList = styled.article`
  .strategyList {
  }
  .strategyListItem {
    cursor: pointer;
    margin-top: 1rem;
  }
`;
/**
 * -매매전략 검색
 * -매매 전략 리스트
 * -개별 종목에 매매 전략 적용
 */
const TradingSettingTabTechnicalSearch = () => {
  const currentIdx = useRecoilValue(atomUniversalSettingStateIdx);
  const [currentUniversalSetting, setCurrentUniversalSetting] = useRecoilState(
    selectedUniversalSetting_R({ universalIdx: currentIdx }),
  );

  // 선택한 전략을 해당 유니버스에 적용시킨다.
  const handleApplyTechinalToTicker = (e: BaseTradingStrategy) => {
    if (currentUniversalSetting)
      setCurrentUniversalSetting({
        ...currentUniversalSetting,
        selectedTechnical: e,
      });
  };

  return (
    <STradingSettingTabTechnicalSearch>
      <WhiteSpace />
      <WideLine style={{ margin: '0 0 1.3rem 0' }} />
      <div className="info">
        "{currentUniversalSetting?.selectedCorporations.corp_name}" 매매전략을
        선택해 주세요.
      </div>
      <WhiteSpace />
      <div className="info">
        선택된 매매 전략 :{' '}
        {currentUniversalSetting?.selectedTechnical?.trading_strategy_name}
      </div>
      <TechnicalSearch
        onSuccess={(e) => {
          console.log('TechnicalSearch onSuccess', e);
        }}
        onKeyDownEnter={(e) => {
          console.log('TechnicalSearch onKeyDownEnter', e);
        }}
      />
      <WhiteSpace />
      <WideLine style={{ margin: '0 0 1.3rem 0' }} />
      <TechnicalStrategyList onSelect={(e) => handleApplyTechinalToTicker(e)} />
    </STradingSettingTabTechnicalSearch>
  );
};
const STradingSettingTabTechnicalSearch = styled.section``;

const MiniBackTestItem: React.FC<{
  baseTradingStrategy: BaseTradingStrategy;
  ticker: string;
  onSelect?: (e: BaseTradingStrategy) => void;
}> = ({ ticker, baseTradingStrategy, onSelect }) => {
  const { reqMiniBTMutation } = useMiniBacktest();
  const handleRequest = () => {
    if (baseTradingStrategy.trading_strategy_name === StrategyName.None) {
    }
    if (
      baseTradingStrategy.trading_strategy_name === StrategyName.GoldenCross
    ) {
      reqMiniBTMutation.mutate({
        ticker,
        salestrategy: baseTradingStrategy.trading_strategy_name,
        setting: [5, 20],
        data: {
          startTime: '20190101',
          endTime: '',
        },
      });
    }
    if (baseTradingStrategy.trading_strategy_name === StrategyName.RSI) {
      reqMiniBTMutation.mutate({
        ticker,
        salestrategy: baseTradingStrategy.trading_strategy_name,
        setting: [30, 70],
        data: {
          startTime: '20190101',
          endTime: '',
        },
      });
    }
  };
  // TODO 무한 리퀘스트 ㅜㅜㅜ
  React.useEffect(() => {
    console.log('effect', ticker, baseTradingStrategy);
    handleRequest();
    return () => {};
  }, []);
  return (
    <div
      onClick={() => {
        if (onSelect) onSelect(baseTradingStrategy);
      }}
    >
      <div>{JSON.stringify(reqMiniBTMutation.data?.data, null, 2)}</div>
    </div>
  );
};

/**
 * 전략 발굴에 대한 검색
 * - 종목 ticker에 대해서 , 가능한 모든 매매전략결과를 알려준다.
 * @returns
 */
const TradingSettingTabQuantSearch = () => {
  const currentIdx = useRecoilValue(atomUniversalSettingStateIdx);
  const [currentUniversalSetting, setCurrentUniversalSetting] = useRecoilState(
    selectedUniversalSetting_R({ universalIdx: currentIdx }),
  );

  // 선택한 전략을 해당 유니버스에 적용시킨다.
  const handleApplyTechinalToTicker = (e: BaseTradingStrategy) => {
    if (currentUniversalSetting)
      setCurrentUniversalSetting({
        ...currentUniversalSetting,
        selectedTechnical: e,
      });
  };

  const ticker = useMemo(() => {
    return currentUniversalSetting?.selectedCorporations.ticker;
  }, [currentUniversalSetting]);

  const { GetTechnicalStrategyListQuery } = useTechnicals();
  return (
    <div>
      <div>
        {currentUniversalSetting?.selectedCorporations.corp_name}에 대한
        매매전략 추천
      </div>
      <div>
        {GetTechnicalStrategyListQuery.data?.map((bs) => {
          if (bs.trading_strategy_name !== 'None' && ticker) {
            return (
              <MiniBackTestItem
                baseTradingStrategy={bs}
                ticker={ticker}
                onSelect={handleApplyTechinalToTicker}
              />
            );
          } else {
            return <></>;
          }
        })}
      </div>
    </div>
  );
};

interface ITradingSetting extends IInspectorSettings {}

const TradingSetting: React.FC<ITradingSetting> = ({ headerTitle }) => {
  const [inspector, setInspector] = useRecoilState(atomInspector);

  const tab = useMemo(
    () => inspector.inspectorState.tradingSetting.tab,
    [inspector.inspectorState.tradingSetting],
  );
  const handleTabIdx = (tabIdx: number) => {
    setInspector((prev) =>
      produce(prev, (draft) => {
        draft.inspectorState.tradingSetting.tab = tabIdx;
        return draft;
      }),
    );
  };

  return (
    <STradingSetting>
      <InspectorHeaderDetail headerTitle={headerTitle || '매매 전략 설정'} />
      <WingBlank>
        <WideLine style={{ margin: '0 0 1.3rem 0' }} />
        <article className="tabContainer">
          <StabItem selected={tab === 0} onClick={() => handleTabIdx(0)}>
            전략 검색
          </StabItem>
          <StabItem selected={tab === 1} onClick={() => handleTabIdx(1)}>
            전략 발굴
          </StabItem>
        </article>
        {tab === 0 && (
          <>
            <TradingSettingTabTechnicalSearch />
          </>
        )}
        {tab === 1 && (
          <>
            <TradingSettingTabQuantSearch />
          </>
        )}
      </WingBlank>
    </STradingSetting>
  );
};

export default TradingSetting;

const STradingSetting = styled.section`
  .tabContainer {
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
  }
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
