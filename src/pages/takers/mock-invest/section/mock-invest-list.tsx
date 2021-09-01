import { WhiteSpace } from "antd-mobile";
import StrategyCard from "components/strategy/StrategyCard";
import React from "react";
import { useHistory } from "react-router-dom";
import { toTagsString } from "utils/parse";
import PageGuide from "components/_modecules/PageGuide";
import { IconMockInvest } from "assets/icons";
import WingBlank from "components/_atoms/WingBlank";

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

const MockInvestList = () => {
  const history = useHistory();

  return (
    <WingBlank>
      <PageGuide
        icon={<IconMockInvest />}
        title="모의 투자"
        subTitle="알고리당의 투자 로직에 따라 매일 모의투자를 합니다."
      />
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
          onClick={(e) => {
            history.push(
              process.env.PUBLIC_URL + "/takers/mock-invest/details/1"
            );
          }}
        />
      ))}
    </WingBlank>
  );
};

export default MockInvestList;
