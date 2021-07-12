import { WingBlank, WhiteSpace, Icon } from "antd-mobile";
import StrategyCard from "components/strategy/strategy-card";
import useBackButton from "hooks/useBackButton";
import React from "react";
import { toTagsString } from "utils/parse";

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <h1 style={{ fontSize: "20px", fontWeight: 700 }}>{title}</h1>;
};
const dummyDatas1 = [
  {
    title: "골드 기업 종합 점수 Top20 ",
    subTitle: ["F-Score", "골든 크로스"],
    CAGR: 22.22,
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
];
const dummyDatas3 = [
  {
    title: "골드 기업 종합 점수 Top20 ",
    subTitle: ["F-Score", "골든 크로스"],
    CAGR: 22.22,
  },
];
const StrategyTypes = () => {
  const Back = useBackButton();
  return (
    <WingBlank style={{ margin: "15x" }} size="lg">
      <WhiteSpace size="xl" />
      {Back()}
      <WhiteSpace size="xl" />
      <Title title={"위험 추구형"} />
      <WhiteSpace size="xl" />
      {dummyDatas2.map((data, key) => (
        <StrategyCard
          key={key}
          title={data.title}
          subTitle={toTagsString(data.subTitle)}
          CAGR={data.CAGR}
        />
      ))}
      <WhiteSpace size="xl" />
      <Title title={"중립형"} />
      <WhiteSpace size="xl" />
      {dummyDatas3.map((data, key) => (
        <StrategyCard
          key={key}
          title={data.title}
          subTitle={toTagsString(data.subTitle)}
          CAGR={data.CAGR}
        />
      ))}
      <Title title={"수익 안정형"} />
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

export default StrategyTypes;
