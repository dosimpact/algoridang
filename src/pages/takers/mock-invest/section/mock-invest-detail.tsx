import React from "react";
import { WingBlank, WhiteSpace, Button } from "antd-mobile";
import { SubTitle } from "components/data-display/Typo";
import StrategyCard from "components/strategy/StrategyCard";
import { useHistory, useParams } from "react-router-dom";
import { toTagsString } from "utils/parse";
import styled from "styled-components";
import ReturnsStatus from "components/strategy-report/ReturnsStatus";
import TradingPoints from "components/strategy-report/TradingPoints";
import BackNav from "components/takers/BackNav";
import TradingHistory from "components/strategy-report/TradingHistory";

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

const MockInvestDetail = () => {
  const history = useHistory();
  const params = useParams() as { id: string };
  // console.log(params);
  return (
    <StrategyDetailP>
      <WingBlank style={{ margin: "15x" }} size="lg">
        <WhiteSpace size="xl" />
        <BackNav title={"모의 투자 상세보기"} />

        <WhiteSpace size="xl" />
        <StrategyCard
          title={dummyDatas.title}
          subTitle={toTagsString(dummyDatas.subTitle)}
          CAGR={dummyDatas.CAGR}
        />
        <>
          <div className="flexRowSBt" style={{ marginTop: "15px" }}>
            <SubTitle
              title="상세 설정"
              style={{ marginRight: "20px" }}
            ></SubTitle>
            <Button
              type="ghost"
              size="small"
              style={{ width: "100px" }}
              onClick={(e) => {
                console.log("deatil");
                history.push(
                  process.env.PUBLIC_URL +
                    `/takers/mock-invest/update/${params.id}`
                );
              }}
            >
              변경
            </Button>
          </div>
          <div className="flexRowSBt" style={{ marginTop: "15px" }}>
            <SubTitle
              title="상세 전략 리포트"
              style={{ marginRight: "20px" }}
            ></SubTitle>
            <Button
              type="ghost"
              size="small"
              style={{ width: "100px" }}
              onClick={(e) => {
                console.log("deatil");
                history.push(
                  process.env.PUBLIC_URL +
                    `/takers/mock-invest/report/${params.id}`
                );
              }}
            >
              리포트
            </Button>
          </div>
        </>
        <ReturnsStatus
          title="모의 투자 수익 현황"
          profit_rate="0.0"
          invest_price="0"
          invest_principal="0"
          total_profit_price="0"
        />
        <TradingPoints />
        <TradingHistory
          title="오늘의 종목"
          header={dummyDatasHistory.header}
          keyMap={dummyDatasHistory.header}
          body={dummyDatasHistory.body}
        />
      </WingBlank>
    </StrategyDetailP>
  );
};

export default MockInvestDetail;

const StrategyDetailP = styled.section`
  .articleHistory {
  }
`;
