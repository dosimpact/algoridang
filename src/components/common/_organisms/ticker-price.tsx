import React, { useMemo, useState, useCallback, useEffect } from 'react';
import TickerSearch from 'components/common/_molecules/TickerSearch';
import LineSeriesChart from 'components/light-weight/LineSeriesChart';
import { useRecoilState } from 'recoil';
import useDailyStock from 'states/finance/query/useDailyStock';
import { atomCorporationState } from 'states/finance/recoil/corporation';
import styled from 'styled-components';
import WingBlank from 'components/common/_atoms/WingBlank';
import BadgePriceDelta from 'components/common/_atoms/BadgePriceDelta';
import WhiteSpace from '../_atoms/WhiteSpace';

// todo:refator onSuccess등 콜백함수에 usecallback안써도 되도록 하기
const TickerPrice = () => {
  const [corporation, setCorporation] = useRecoilState(atomCorporationState);
  // const [corporation, setCorporation] = useState<{ticker:string}>("005930");
  const { dayilStocks } = useDailyStock(corporation.ticker, 1095, 0, 'ASC');
  const [price, setPrice] = useState(0);

  const datas = useMemo(() => {
    return dayilStocks?.map((daily) => ({
      time: daily.stock_date,
      value: Number(daily.close_price),
    }));
  }, [dayilStocks]);

  const diff = useMemo(() => {
    if (dayilStocks && dayilStocks.length >= 2) {
      return {
        tday: dayilStocks[dayilStocks.length - 1].close_price,
        yday: dayilStocks[dayilStocks.length - 2].close_price,
      };
    } else {
      return {
        tday: NaN,
        yday: NaN,
      };
    }
  }, [dayilStocks]);

  useEffect(() => {
    if (datas && datas[datas.length - 1] && datas[datas.length - 1].value) {
      setPrice(datas[datas.length - 1].value);
    }
    return () => {};
  }, [datas]);

  return (
    <TickerPriceS>
      <WingBlank>
        <WhiteSpace style={{ marginTop: '1rem' }} />
        <TickerSearch
          onSuccess={useCallback(
            (e) => {
              // console.log("TickerSearch sucess", e.corp_name, e.ticker);
              if (e.corp_name && e.ticker) {
                const { corp_name, ticker } = e;
                setCorporation({ corp_name, ticker });
              }
            },
            [setCorporation],
          )}
        />
      </WingBlank>

      <WingBlank>
        <article className="chartLegend">
          <div className="tickerName">{corporation.corp_name}</div>
          <div className="tickerPrice">
            <span className="priceText">{price}</span>
            <span className="unitText">원</span>
            <BadgePriceDelta today={diff.tday} yesterday={diff.yday} />
          </div>
        </article>
      </WingBlank>
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
  .chartLegend {
    margin-top: 5.8rem;
    padding: 0rem 1.5rem;
    font-size: 2.3rem;
    font-weight: 400;
    .tickerName {
      margin-bottom: 1rem;
    }
    .tickerPrice {
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-end;
      margin-top: 0.5rem;
      .priceText {
        color: #f3bc2f;
        font-weight: 600;
        font-size: 3.3rem;
        margin-right: 0.5rem;
      }
      .unitText {
        margin-right: 1.5rem;
        font-size: 2.7rem;
      }
    }
  }
  .chartBox {
    margin-top: 4.8rem;
    background-color: white;
    border-radius: 1rem;
    padding: 1.2rem 0rem;
  }
`;
