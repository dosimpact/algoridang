import { WingBlank, WhiteSpace } from "antd-mobile";
import StrategyCard from "components/strategy/strategy-card";
import React from "react";
import { toTagsString } from "utils/parse";

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <h1 style={{ fontSize: "20px", fontWeight: 700 }}>{title}</h1>;
};

const dummyDatas2 = [
  {
    title: "삼성전자 황금 신호",
    subTitle: ["단일 종목", "골든 크로스"],
    CAGR: -1.2,
  },
];

const MockInvestP = () => {
  return (
    <WingBlank style={{ margin: "15x" }} size="lg">
      <WhiteSpace size="xl" />
      <Title title={"나의 모의 투자 전략"} />
      <WhiteSpace size="xl" />
      {dummyDatas2.map((data, key) => (
        <StrategyCard
          key={key}
          title={data.title}
          subTitle={toTagsString(data.subTitle)}
          CAGR={data.CAGR}
          StrategyState="운용중"
        />
      ))}
    </WingBlank>
  );
};

export default MockInvestP;
