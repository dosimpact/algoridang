import React from "react";
import { WingBlank, WhiteSpace } from "antd-mobile";
import StrategyCard from "components/strategy/StrategyCard";
import { toTagsString } from "utils/parse";
import styled from "styled-components";
import ReturnsStatus from "components/strategy-report/ReturnsStatus";
import TradingPoints from "components/strategy-report/TradingPoints";
import TradingHistory from "components/strategy-report/TradingHistory";
import DetailSummary from "components/strategy-report/DetailSummary";
import CumulativeReturn from "components/strategy-report/CumulativeReturn";
import MonthlyReturn from "components/strategy-report/MonthlyReturn";
import WinRatio from "components/strategy-report/WinRatio";
import TradingHistoryToday from "components/strategy-report/TradingHistoryToday";

const dummyDatasReport = {
  header: ["항목", "결과값"],
  body: [
    {
      항목: "운용기간",
      결과값: "⚛",
    },
    {
      항목: "편입종목",
      결과값: "⚛",
    },
    {
      항목: "수수료",
      결과값: "⚛",
    },
    {
      항목: "누적수익율",
      결과값: "⚛",
    },
    {
      항목: "연평균수익율",
      결과값: "⚛",
    },
    {
      항목: "MDD",
      결과값: "⚛",
    },
    {
      항목: "거래 개월수",
      결과값: "⚛",
    },
    {
      항목: "상승 개월수",
      결과값: "⚛",
    },
    {
      항목: "승률",
      결과값: "⚛",
    },
    {
      항목: "전체 거래종목수",
      결과값: "⚛",
    },
    {
      항목: "월평균수익률",
      결과값: "⚛",
    },
    {
      항목: "월간변동성(샤프)",
      결과값: "⚛",
    },
  ],
};

const dummyDatas = {
  title: "삼성전자 황금 신호",
  subTitle: ["단일 종목", "골든 크로스"],
  CAGR: -1.2,
};
const dummyDatasHistory = {
  header: ["날짜", "매수/매도", "가격", "수익/손실"],
  body: [
    {
      날짜: "20-06-15",
      "매수/매도": "삼성전자",
      가격: "99,000",
      "수익/손실": "12.7",
    },
    {
      날짜: "20-06-10",
      "매수/매도": "삼성전자",
      가격: "88,000",
      "수익/손실": "",
    },
    {
      날짜: "20-06-05",
      "매수/매도": "삼성전자",
      가격: "88,900",
      "수익/손실": "12.7",
    },
    {
      날짜: "20-05-13",
      "매수/매도": "삼성전자",
      가격: "89,500",
      "수익/손실": "",
    },
  ],
};

const StrategyReport = () => {
  return (
    <StrategyDetailP>
      <WingBlank style={{ margin: "15x" }} size="lg">
        <WhiteSpace size="xl" />
        <StrategyCard
          title={dummyDatas.title}
          subTitle={toTagsString(dummyDatas.subTitle)}
          CAGR={dummyDatas.CAGR}
        />

        <ReturnsStatus title="모의 투자 수익 현황" />
        <TradingPoints />
        <TradingHistory
          body={dummyDatasHistory.body}
          header={dummyDatasHistory.header}
        />
        <TradingHistoryToday
          body={dummyDatasHistory.body}
          header={dummyDatasHistory.header}
        />
        {/* 4. 상세 리포트 DetailSummary.tsx  */}
        <DetailSummary
          body={dummyDatasReport.body}
          header={dummyDatasReport.header}
        />
        {/* 5. 백테스팅 누적 수익률 CumulativeReturn.tsx */}
        <CumulativeReturn />
        {/* 6. 백테스팅 월간 수익률 */}
        <MonthlyReturn />
        {/* 7. 승률 */}
        <WinRatio />
      </WingBlank>
    </StrategyDetailP>
  );
};

export default StrategyReport;

const StrategyDetailP = styled.section`
  .articleHistory {
  }
`;
