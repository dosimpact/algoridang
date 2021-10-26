import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  atomUniversalSettingStateIdx,
  selectedUniversalSetting_R,
} from 'states/common/recoil/dashBoard/dashBoard';
import styled from 'styled-components';
import { useTechnicals } from 'states/trading/query/useTechnicals';
import {
  BaseTradingStrategy,
  StrategyName,
} from 'states/trading/interface/entities';
import WideLine from 'components/common/_atoms/WideLine';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import { Button } from 'components/common/_atoms/Buttons';
import useMiniBacktest from 'states/backtest/query/useMiniBacktest';
import { Title } from 'components/common/_atoms/Typos';
import { toPercentage } from 'utils/parse';

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
  // TODO bug 무한 랜더링 리퀘스트 ㅜㅜㅜ
  React.useEffect(() => {
    console.log('TODO effect dept', ticker, baseTradingStrategy);
    handleRequest();
    return () => {};
  }, []);

  const result = React.useMemo(() => {
    return reqMiniBTMutation.data?.data.res;
  }, [reqMiniBTMutation]);

  return (
    <SMiniBackTestItem
      onClick={() => {
        if (onSelect) onSelect(baseTradingStrategy);
      }}
    >
      {result && (
        <>
          <div className="container">
            <div className="col">
              <Button type="blue">
                {baseTradingStrategy.trading_strategy_name}
              </Button>
            </div>
            {/* <div className="col col2">{toPercentage(result.profit_rate)}</div> */}
            <div className="col">
              {toPercentage(result.year_avg_profit_rate)}%
            </div>
            <div className="col">{toPercentage(result.mdd)}%</div>
          </div>
        </>
      )}
    </SMiniBackTestItem>
  );
};
const SMiniBackTestItem = styled.div`
  .container {
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    margin: 1rem 0rem;
    .col {
      text-align: center;
    }
  }
`;

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
    <STradingSettingTabQuantSearch>
      <WhiteSpace />
      <WideLine style={{ margin: '0 0 1.3rem 0' }} />
      <Title
        title={`"${currentUniversalSetting?.selectedCorporations.corp_name}"에 대한
  매매전략 추천`}
      ></Title>
      <WhiteSpace />
      <div className="container">
        <div className="col">전략이름</div>
        <div className="col">CAGR</div>
        <div className="col">MDD</div>
      </div>
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
    </STradingSettingTabQuantSearch>
  );
};

const STradingSettingTabQuantSearch = styled.section`
  .container {
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    margin: 1rem 0rem;
    .col {
      text-align: center;
    }
  }
`;

export default TradingSettingTabQuantSearch;
