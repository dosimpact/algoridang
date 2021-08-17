import React from "react";
import { WingBlank, WhiteSpace } from "antd-mobile";
import StrategyCard from "components/strategy/StrategyCard";
import { useParams } from "react-router-dom";
import { toTagsString } from "utils/parse";
import styled from "styled-components";
import DetailSummary from "components/strategy-report/DetailSummary";
import CumulativeReturn from "components/strategy-report/CumulativeReturn";
import MonthlyReturn from "components/strategy-report/MonthlyReturn";
import WinRatio from "components/strategy-report/WinRatio";
import BackNav from "components/takers/BackNav";

const dummyDatas = {
  title: "삼성전자 황금 신호",
  subTitle: ["단일 종목", "골든 크로스"],
  CAGR: 22.22,
};

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

const MockInvestReport = () => {
  const params = useParams();
  console.log(params);

  return (
    <StrategyDetailP>
      <WingBlank style={{ margin: "15x" }} size="lg">
        <WhiteSpace size="xl" />
        <BackNav title={"모의 투자 리포트"} />
        <WhiteSpace size="xl" />
        <StrategyCard
          title={dummyDatas.title}
          subTitle={toTagsString(dummyDatas.subTitle)}
          CAGR={dummyDatas.CAGR}
        />
        {/* 4. 상세 리포트 DetailSummary.tsx  */}
        <DetailSummary
          body={dummyDatasReport.body}
          header={dummyDatasReport.header}
        />
        {/* 5. 백테스팅 누적 수익률 CumulativeReturn.tsx */}
        <CumulativeReturn strategyCode="1" />
        {/* 6. 백테스팅 월간 수익률 */}
        <MonthlyReturn strategyCode="1" />
        {/* 7. 승률 */}
        <WinRatio />
      </WingBlank>
    </StrategyDetailP>
  );
};

export default MockInvestReport;

const StrategyDetailP = styled.section`
  margin-bottom: 120px;
  overflow: hidden;
`;
