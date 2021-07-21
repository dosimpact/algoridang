import { WingBlank, WhiteSpace, List, InputItem, Button } from "antd-mobile";
import ListItem from "antd-mobile/lib/list/ListItem";
import StrategyCard from "components/strategy/StrategyCard";
import useBackButton from "hooks/useBackButton";
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

const MockInvestUpdate = () => {
  const backBtn = useBackButton();
  return (
    <WingBlank style={{ margin: "15x" }} size="lg">
      <WhiteSpace size="xl" />
      <div className="flexRow">
        {backBtn()}
        <Title title={"전략 수정 하기"} />
      </div>
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
      <WingBlank size="lg">
        <Title title={"기본 설정"} />
        <List renderHeader={() => ""}>
          <InputItem clear placeholder="eg) 1번 전략">
            전략이름
          </InputItem>
        </List>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <Title title={"사용자 설정"} />
        <List renderHeader={() => ""}>
          <InputItem clear placeholder="투자 시작 금액을 입력해주세요.">
            원금
          </InputItem>
          <InputItem clear placeholder="거래당 발생하는 수수료">
            수수료%
          </InputItem>
        </List>
        <WhiteSpace size="xl" />
      </WingBlank>
      <Button type="warning">수정 완료</Button>
    </WingBlank>
  );
};

export default MockInvestUpdate;
