import TickerSearch from "components/inputs/TickerSearch";
import LineSeriesChart from "components/light-weight/LineSeriesChart";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import useDailyStock from "states/react-query/finance/useDailyStock";
import { atomCorporationState } from "states/recoil/corporation";
import styled from "styled-components";

// todo:refator onSuccess등 콜백함수에 usecallback안써도 되도록 하기
const TickerPrice = () => {
  const [corporation, setCorporation] = useRecoilState(atomCorporationState);
  // const [corporation, setCorporation] = useState<{ticker:string}>("005930");
  const { dayilStocks } = useDailyStock(corporation.ticker, 365, 0, "ASC");
  const [price, setPrice] = useState(0);

  const datas = useMemo(() => {
    return dayilStocks?.map((daily) => ({
      time: daily.stock_date,
      value: Number(daily.close_price),
    }));
  }, [dayilStocks]);

  useEffect(() => {
    if (datas) setPrice(datas[datas.length - 1].value);
    return () => {};
  }, [datas]);

  return (
    <TickerPriceS>
      <TickerSearch
        onSuccess={useCallback(
          (e) => {
            // console.log("TickerSearch sucess", e.corp_name, e.ticker);
            if (e.corp_name && e.ticker) {
              const { corp_name, ticker } = e;
              setCorporation({ corp_name, ticker });
            }
          },
          [setCorporation]
        )}
      />
      <article className="chartLegend">
        <div className="tickerName">{corporation.corp_name}</div>
        <div className="tickerPrice">{price} 원</div>
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

const TickerPriceS = styled.section`
  padding: 0rem 1.5rem;
  .chartLegend {
    padding: 0rem 1.5rem;
    font-size: 3.5rem;
    font-weight: 500;
    .tickerName {
    }
    .tickerPrice {
      margin-top: 0.5rem;
    }
  }
`;
