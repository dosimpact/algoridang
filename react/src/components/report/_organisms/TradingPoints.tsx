import { Title } from 'components/common/_atoms/Typos';
import LineSeriesChartPointing from 'components/light-weight/LineSeriesChartPointing';
import { SeriesMarker, Time } from 'lightweight-charts';
import React, { useCallback, useMemo, useState } from 'react';
import useBackTestHistory from 'states/backtest/query/useBackTestHistory';
import useDailyStock from 'states/finance/query/useDailyStock';
import styled from 'styled-components';
import { UTCtoDate } from 'utils/parse';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import FNumber from 'components/common/_atoms/FNumber';
import { History } from 'states/backtest/interface/entities';

// 매매시점 컴포넌트의 차트
const ChartBuySelPoint: React.FC<{ ticker: string; strategyCode: string }> = ({
  ticker,
  strategyCode,
}) => {
  const { dayilStocks } = useDailyStock(ticker, 3650, 0, 'ASC');
  const { historiesQuery } = useBackTestHistory(strategyCode);
  const [currentMarkerId, setMarkerId] = useState<null | number>(null);

  const datas = useMemo(() => {
    return dayilStocks?.map((daily) => ({
      time: daily.stock_date,
      value: Number(daily.close_price),
    }));
  }, [dayilStocks]);

  const markerDatas = useMemo(() => {
    if (historiesQuery.isLoading) {
      return [];
    } else if (!historiesQuery.isLoading && !historiesQuery.isError) {
      return historiesQuery.data?.historyList?.map((h) => {
        // 매도(판매)
        if (h.profit_loss_rate) {
          return {
            id: '' + h.history_code,
            time: UTCtoDate(h.history_date),
            position: 'belowBar',
            color: '#e91e63',
            shape: 'arrowUp',
            text: `Sell@ ${h.profit_loss_rate}%`,
          };
        } //매수
        else {
          return {
            id: '' + h.history_code,
            time: UTCtoDate(h.history_date),
            position: 'aboveBar',
            color: '#2196F3',
            shape: 'arrowDown',
            text: 'Buy',
          };
        }
      }) as SeriesMarker<Time>[];
    }
  }, [historiesQuery]);

  const currnetHistory = useMemo(() => {
    if (historiesQuery.isLoading) {
      return null;
    } else if (!historiesQuery.isLoading && !historiesQuery.isError) {
      if (historiesQuery.data?.historyList) {
        for (let i = 0; i < historiesQuery.data?.historyList?.length; i++) {
          // return historiesQuery.data?.historyList?.map((h) => {});
          if (
            historiesQuery.data?.historyList[i].history_code === currentMarkerId
          ) {
            return historiesQuery.data?.historyList[i] as History;
          }
        }
      }
      return null;
    }
  }, [historiesQuery, currentMarkerId]);

  return (
    <div>
      <div style={{ fontSize: '1.2rem' }}>
        {currnetHistory &&
          `${currnetHistory.history_date.slice(0, 10)} |   
          ${currnetHistory.ticker} |
          ${currnetHistory.buy_sale_price} | `}
        {currnetHistory && currnetHistory.profit_loss_rate === null
          ? '매수'
          : currnetHistory && (
              <span>
                <FNumber val={currnetHistory.profit_loss_rate} />%
              </span>
            )}
      </div>
      <WhiteSpace />
      <LineSeriesChartPointing
        datas={datas}
        markerDatas={markerDatas}
        onHoverMarker={useCallback((e) => {
          // console.log(e.markerId);
          const markerId = Number(e.markerId);
          setMarkerId(markerId);
        }, [])}
      />
    </div>
  );
};

// 매매시점 컴포넌트
interface ITradingPoints {
  title?: string;
  ticker: string;
  strategyCode: string;
  props?: any;
}
const TradingPoints: React.FC<ITradingPoints> = ({
  title,
  ticker,
  strategyCode,
  ...props
}) => {
  return (
    <STradingPoints {...props}>
      <div className="flexRow" style={{ marginTop: '50px' }}>
        <Title title={title || '매매 시점'} style={{ margin: '20px 0px' }} />
      </div>
      <ChartBuySelPoint ticker={ticker} strategyCode={strategyCode} />
    </STradingPoints>
  );
};

export default TradingPoints;

const STradingPoints = styled.article``;
