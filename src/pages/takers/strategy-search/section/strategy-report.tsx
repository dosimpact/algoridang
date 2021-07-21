import React from "react";
import { WingBlank, WhiteSpace, Icon, Button } from "antd-mobile";
import { Title, SubTitle } from "components/data-display/Typo";
import StrategyCard from "components/strategy/StrategyCard";
import useBackButton from "hooks/useBackButton";
import { useHistory, useParams } from "react-router-dom";
import { toTagsString } from "utils/parse";
import styled from "styled-components";
import ReportTable from "components/data-display/ReportTable";
import ChartCumulativeReturn from "components/data-display/ChartCumulativeReturn";
import ChartMonthlyReturn from "components/data-display/ChartMonthlyReturn";
import ChartWinRatio from "components/data-display/ChartWinRatio";

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

const StrategyReport = () => {
  const Back = useBackButton();
  const params = useParams();
  const history = useHistory();
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
          <Button type="warning" size="small" style={{ width: "100px" }}>
            시작하기
          </Button>
        </div>

        <article className="articleHistory" style={{ marginBottom: "100px" }}>
          <div className="flexRow" style={{ marginTop: "50px" }}>
            <SubTitle title="상세 리포트" style={{ margin: "20px 0px" }} />
          </div>
          <ReportTable
            body={dummyDatasReport.body}
            header={dummyDatasReport.header}
          />
        </article>
        <article className="articleCumulativeReturn">
          <div className="flexRow" style={{ marginTop: "50px" }}>
            <SubTitle
              title="백테스팅 누적 수익률"
              style={{ marginTop: "20px" }}
            />
          </div>
          <ChartCumulativeReturn />
        </article>
        <article className="articleMonthlyReturn">
          <div className="flexRow" style={{ marginTop: "50px" }}>
            <SubTitle
              title="백테스팅 월간 수익률"
              style={{ marginTop: "20px" }}
            />
          </div>
          <ChartMonthlyReturn />
        </article>
        <article className="articleWinRatio">
          <div className="flexRow" style={{ marginTop: "50px" }}>
            <SubTitle title="백테스팅 승률" style={{ marginTop: "20px" }} />
          </div>
          <ChartWinRatio />
        </article>
      </WingBlank>
    </StrategyDetailP>
  );
};

export default StrategyReport;

const StrategyDetailP = styled.section`
  margin-bottom: 120px;
  overflow: hidden;
  .articleHistory {
  }
  .articleCumulativeReturn {
  }
  .articleMonthlyReturn {
  }
  .articleWinRatio {
  }
`;
