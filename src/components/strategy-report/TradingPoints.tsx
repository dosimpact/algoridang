import { SubTitle } from "components/data-display/Typo";
import LineSeriesChartPointing from "components/light-weight/LineSeriesChartPointing";
import { SeriesMarker, Time } from "lightweight-charts";
import React, { useMemo } from "react";
import useBackTestHistory from "states/react-query/backtest/useBackTestHistory";
import useDailyStock from "states/react-query/finance/useDailyStock";
import styled from "styled-components";
import { UTCtoDate } from "utils/parse";

// 매매시점 컴포넌트의 차트
const ChartBuySelPoint: React.FC<{ ticker: string; strategyCode: string }> = ({
  ticker,
  strategyCode,
}) => {
  const { dayilStocks } = useDailyStock(ticker, 3650, 0, "ASC");
  const { historiesQuery } = useBackTestHistory(strategyCode);
  console.log("historiesQuery", historiesQuery);

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
            id: "" + h.history_code,
            time: UTCtoDate(h.history_date),
            position: "belowBar",
            color: "#e91e63",
            shape: "arrowUp",
            text: `Sell@ ${h.profit_loss_rate}%`,
          };
        } //매수
        else {
          return {
            id: "" + h.history_code,
            time: UTCtoDate(h.history_date),
            position: "aboveBar",
            color: "#2196F3",
            shape: "arrowDown",
            text: "Buy",
          };
        }
      }) as SeriesMarker<Time>[];
    }
  }, [historiesQuery]);
  console.log("datas", datas, "markerDatas", markerDatas);

  return <LineSeriesChartPointing datas={datas} markerDatas={markerDatas} />;
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
      <div className="flexRow" style={{ marginTop: "50px" }}>
        <SubTitle title={title || "매매 시점"} style={{ margin: "20px 0px" }} />
      </div>
      <ChartBuySelPoint ticker={ticker} strategyCode={strategyCode} />
    </STradingPoints>
  );
};

export default TradingPoints;

const STradingPoints = styled.article``;
