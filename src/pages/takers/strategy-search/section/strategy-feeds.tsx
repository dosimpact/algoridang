import { WingBlank, WhiteSpace } from "antd-mobile";
import StrategyCard from "components/strategy/strategy-card";
import React from "react";
import { useHistory } from "react-router-dom";
import { toTagsString } from "utils/parse";

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <h1 style={{ fontSize: "20px", fontWeight: 700 }}>{title}</h1>;
};

const dummyDatas1 = [
  {
    title: "투자 성향별 종목 검색",
    subTitle: "나만의 성향에 맞는 전략 찾아봅니다.",
  },
];

const dummyDatas2 = [
  {
    title: "삼성전자 황금 신호",
    subTitle: ["단일 종목", "골든 크로스"],
    CAGR: 22.22,
  },
  {
    title: "싸질만큼 싸진 바이오 제약주 Top10",
    subTitle: ["바이오 섹터", "블린저 매매"],
    CAGR: 10.91,
  },
  {
    title: "조엘 그린블라트의 마법공식 Top20",
    subTitle: ["저평가", "고수익"],
    CAGR: 12.82,
  },
];
const dummyDatas3 = [
  {
    title: "골드 기업 종합 점수 Top20 ",
    subTitle: ["F-Score", "골든 크로스"],
    CAGR: 22.22,
  },
];
const StrategyFeeds = () => {
  const history = useHistory();

  return (
    <WingBlank style={{ margin: "15x" }} size="lg">
      <WhiteSpace size="xl" />
      <StrategyCard
        title="투자 성향별 종목 검색"
        subTitle="나만의 성향에 맞는 전략 찾아봅니다."
        onClick={(e) => {
          console.log("click", e.currentTarget);
          history.push("/takers/strategy-search/types");
        }}
      />
      <WhiteSpace size="xl" />
      <Title title={"신규 투자 전략"} />
      <WhiteSpace size="xl" />
      {dummyDatas2.map((data, key) => (
        <StrategyCard
          key={key}
          title={data.title}
          subTitle={toTagsString(data.subTitle)}
          CAGR={data.CAGR}
          onClick={(e) => {
            console.log("click", e.currentTarget);
            history.push("/takers/strategy-search/details/1");
          }}
        />
      ))}
      <WhiteSpace size="xl" />
      <Title title={"조회수 높은 투자 전략"} />
      <WhiteSpace size="xl" />
      {dummyDatas3.map((data, key) => (
        <StrategyCard
          key={key}
          title={data.title}
          subTitle={toTagsString(data.subTitle)}
          CAGR={data.CAGR}
        />
      ))}
    </WingBlank>
  );
};

export default StrategyFeeds;
