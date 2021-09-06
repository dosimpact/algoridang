import React from "react";
import { Button } from "antd-mobile";
import { SubTitle } from "components/_atoms/Typos";
import { useHistory, useParams } from "react-router-dom";
import { toTagsString } from "utils/parse";
import styled from "styled-components";
import ReturnsStatus from "components/_organisms/report/ReturnsStatus";
import TradingHistory from "components/_organisms/report/TradingHistory";
import { useMyStrategyId } from "states/react-query/strategy/useMyStrategyId";
import WingBlank from "components/_atoms/WingBlank";
import WhiteSpace from "components/_atoms/WhiteSpace";
import StrategyCardBox from "components/_molecules/StrategyCardBox";
import NavHeaderDetail from "components/_molecules/NavHeaderDetail";

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
  if (!params.id || !Number.isInteger(Number(params.id))) {
    history.push(process.env.PUBLIC_URL + "/takers/mock-invest");
  }
  const strategyCode = params.id;
  const { getMyStrategyByIdQuery } = useMyStrategyId(strategyCode);
  console.log("getMyStrategyByIdQuery", getMyStrategyByIdQuery);

  const memberStrategy = React.useMemo(
    () => getMyStrategyByIdQuery.data?.memberStrategy,
    [getMyStrategyByIdQuery]
  );

  return (
    <StrategyDetailP>
      <NavHeaderDetail
        linkTo={process.env.PUBLIC_URL + "/takers/mock-invest"}
        headerTitle="모의 투자 상세보기"
      />
      <WingBlank>
        <WhiteSpace />
        {memberStrategy && (
          <StrategyCardBox
            title={memberStrategy.strategy_name}
            subTitle={toTagsString(
              memberStrategy.hashList?.map((e) => e?.hash?.hash_contents)
            )}
            CAGR={
              memberStrategy?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(memberStrategy?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={memberStrategy.image_url}
          />
        )}
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
        {/* <TradingPoints /> */}
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
