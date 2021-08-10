import ChartCumulativeReturn from "components/data-display/ChartCumulativeReturn";
import { SubTitle } from "components/data-display/Typo";
import LineSeriesChartPointing from "components/light-weight/LineSeriesChartPointing";
import React, { useMemo } from "react";
import useDailyStock from "states/react-query/finance/useDailyStock";
import styled from "styled-components";

const ChartBuySelPoint: React.FC<{ ticker: string }> = ({ ticker }) => {
  const { dayilStocks } = useDailyStock(ticker, 365, 0, "ASC");

  const datas = useMemo(() => {
    return dayilStocks?.map((daily) => ({
      time: daily.stock_date,
      value: Number(daily.close_price),
    }));
  }, [dayilStocks]);

  return <LineSeriesChartPointing datas={datas} />;
};

interface ITradingPoints {
  title?: string;
  ticker: string;
  props?: any;
}
const TradingPoints: React.FC<ITradingPoints> = ({
  title,
  ticker,
  ...props
}) => {
  return (
    <STradingPoints {...props}>
      <div className="flexRow" style={{ marginTop: "50px" }}>
        <SubTitle title={title || "매매 시점"} style={{ margin: "20px 0px" }} />
      </div>
      <ChartBuySelPoint ticker={ticker} />
    </STradingPoints>
  );
};

export default TradingPoints;

const STradingPoints = styled.article``;
