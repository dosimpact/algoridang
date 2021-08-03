import LineSeriesChart from "components/light-weight/LineSeriesChart";
import React, { useMemo, useState, useCallback } from "react";
import useDailyStock from "states/react-query/finance/useDailyStock";
import styled from "styled-components";

const TickerPrice = () => {
  const { dayilStocks } = useDailyStock("005930", 365, 0, "ASC");
  const [price, setPrice] = useState(0);
  const datas = useMemo(
    () =>
      dayilStocks?.map((daily) => ({
        time: daily.stock_date,
        value: Number(daily.close_price),
      })),
    [dayilStocks]
  );
  return (
    <TickerPriceS>
      <article className="searchBar">searchBar</article>
      <article className="chartLegend">
        <div>005930</div>
        <div>{price}</div>
      </article>
      <article className="chartBox">
        <LineSeriesChart
          datas={datas}
          onCrossHairChange={useCallback((e) => {
            // console.log(e);
            if (e.price) {
              setPrice(e.price);
            }
          }, [])}
        />
      </article>
    </TickerPriceS>
  );
};

export default TickerPrice;

const TickerPriceS = styled.section``;
