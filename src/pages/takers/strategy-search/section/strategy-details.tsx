import React from "react";
import { WingBlank, WhiteSpace, Button } from "antd-mobile";
import { Title, SubTitle } from "components/data-display/Typo";
import StrategyCard from "components/strategy/StrategyCard";
import useBackButton from "hooks/useBackButton";
import { useHistory, useParams } from "react-router-dom";
import { toTagsString } from "utils/parse";
import styled from "styled-components";
import HistoryTable from "components/data-display/history/HistoryTable";
import ChartCumulativeReturn from "components/data-display/ChartCumulativeReturn";

// const Title: React.FC<{ title: string }> = ({ title }) => {
//   return <h1 style={{ fontSize: "20px", fontWeight: 700 }}>{title}</h1>;
// };

// const SubTitle: React.FC<{ title: string }> = ({ title }) => {
//   return <h1 style={{ fontSize: "16px", fontWeight: 700 }}>{title}</h1>;
// };

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
            title="상세 전략 보기"
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

        <article className="articleDescription">
          <div className="flexRow" style={{ marginTop: "50px" }}>
            <SubTitle title="전략 메이커 설명" style={{ marginTop: "20px" }} />
          </div>
          <div className="description" style={{ marginTop: "10px" }}>
            국민 주식 삼성전자에 가장 어울리는 매매전략인 골든 크로스로 제작
          </div>
        </article>
        <article className="articleReturnsStatus">
          <div className="flexRow" style={{ marginTop: "50px" }}>
            <SubTitle title="투자 수익 현황" style={{ marginTop: "20px" }} />
          </div>
          <div className="returnsStatus" style={{ margin: "15px 0px" }}>
            <div className="flexRowSBt" style={{ margin: "5px 0px" }}>
              <div className="name">예상 연수익률</div>
            </div>
            <div className="flexRowSBt" style={{ marginBottom: "15px" }}>
              <div className="value returnsValue">22.21%</div>
            </div>
            <div className="flexRowSBt" style={{ margin: "15px 0px" }}>
              <div className="name">투자 원금</div>
              <div className="value">10,160,000원</div>
            </div>
            <div className="flexRowSBt" style={{ margin: "15px 0px" }}>
              <div className="name">총 수익금</div>
              <div className="value">130,000원</div>
            </div>
            <div className="flexRowSBt" style={{ margin: "10px 0px" }}>
              <div className="name">예상 투자 금액</div>
              <div className="value">10,290,000원</div>
            </div>
          </div>
        </article>

        <article className="articleTrading">
          <div className="flexRow" style={{ marginTop: "50px" }}>
            <SubTitle title="매매 시점" style={{ marginTop: "20px" }} />
          </div>
          <ChartCumulativeReturn />
        </article>

        <article className="articleHistory" style={{ marginBottom: "100px" }}>
          <div className="flexRow" style={{ marginTop: "50px" }}>
            <SubTitle title="히스토리" style={{ margin: "20px 0px" }} />
          </div>
          <HistoryTable
            body={dummyDatasHistory.body}
            header={dummyDatasHistory.header}
          />
        </article>
      </WingBlank>
    </StrategyDetailP>
  );
};

export default StrategyDetails;

const StrategyDetailP = styled.section`
  .articleDescription {
    .description {
      line-height: 20px;
    }
  }
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
