import { WingBlank, WhiteSpace, List, InputItem, Button } from "antd-mobile";
import StrategyCard from "components/lagacy/StrategyCard";
import useBackButton from "components/lagacy/useBackButton";
import React from "react";
import { useHistory } from "react-router-dom";
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

const MockInvestCreate = () => {
  const history = useHistory();
  const backBtn = useBackButton();
  return (
    <WingBlank style={{ margin: "15x" }} size="lg">
      <WhiteSpace size="xl" />
      <div className="flexRow">
        {backBtn()}
        <Title title={"전략 생성 하기"} />
      </div>
      <WhiteSpace size="xl" />
      {dummyDatas2.map((data, key) => (
        <StrategyCard
          key={key}
          title={data.title}
          subTitle={toTagsString(data.subTitle)}
          CAGR={data.CAGR}
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
      <Button
        type="warning"
        onClick={() => {
          history.push("/takers/mock-invest/details/1");
        }}
      >
        전략 생성 및 백테스팅 시작
      </Button>
    </WingBlank>
  );
};

export default MockInvestCreate;
