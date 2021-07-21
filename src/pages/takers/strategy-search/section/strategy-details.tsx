import React from "react";
import { WingBlank, WhiteSpace, Button } from "antd-mobile";
import { Title, SubTitle } from "components/data-display/Typo";
import StrategyCard from "components/strategy/StrategyCard";
import useBackButton from "hooks/useBackButton";
import { useHistory, useParams } from "react-router-dom";
import { toTagsString } from "utils/parse";
import styled from "styled-components";
import TradingHistory from "components/strategy-report/TradingHistory";
import TradingPoints from "components/strategy-report/TradingPoints";
import ReturnsStatus from "components/strategy-report/ReturnsStatus";
import Description from "components/strategy-report/Description";

const dummyDatas = {
  title: "삼성전자 황금 신호",
  subTitle: ["단일 종목", "골든 크로스"],
  CAGR: 22.22,
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

const StrategyDetails = () => {
  const Back = useBackButton();
  const history = useHistory();
  const params = useParams() as { id: string };
  console.log(params);
  return (
    <StrategyDetailP>
      <WingBlank style={{ margin: "15x" }} size="lg">
        <WhiteSpace size="xl" />
        <div className="flexRow">
          {Back()}
          <Title title={"투자 전략 리포트"} />
        </div>
        <WhiteSpace size="xl" />
        <StrategyCard
          title={dummyDatas.title}
          subTitle={toTagsString(dummyDatas.subTitle)}
          CAGR={dummyDatas.CAGR}
        />
        <div className="flexRowSBt">
          <SubTitle
            title="모의 투자"
            style={{ marginRight: "15px" }}
          ></SubTitle>
          <Button
            type="warning"
            size="small"
            style={{ width: "100px" }}
            onClick={() => {
              history.push("/takers/mock-invest/create/1");
            }}
          >
            시작하기
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
                  `/takers/strategy-search/report/${params.id}`
              );
            }}
          >
            리포트
          </Button>
        </div>
        {/* 0. 전략 메이커 설명 Description.tsx */}
        <Description description="국민 주식 삼성전자에 가장 어울리는 매매전략인 골든 크로스로 제작" />
        {/* 1. 투자 수익 현황 ReturnsStatus.tsx */}
        <ReturnsStatus title=" 투자 수익 현황" />
        {/* 2. 매매 시점 TradingPoints.tsx */}
        <TradingPoints />
        {/* 3. 트레이딩 히스토리 */}
        <TradingHistory
          body={dummyDatasHistory.body}
          header={dummyDatasHistory.header}
        />
      </WingBlank>
    </StrategyDetailP>
  );
};

export default StrategyDetails;

const StrategyDetailP = styled.section`
  .articleReturnsStatus {
    .name {
      color: ${(props) => props.theme.ColorGray};
    }
    .value {
      color: ${(props) => props.theme.ColorYellow};
      font-weight: 600;
    }
    .returnsValue {
      font-size: ${(props) => props.theme.FontSizeXXlg};
    }
  }
  .articleTrading {
  }
  .articleHistory {
  }
`;
