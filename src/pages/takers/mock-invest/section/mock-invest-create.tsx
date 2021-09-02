import { List, InputItem, Button } from "antd-mobile";
import StrategyCard from "components/lagacy/StrategyCard";
import useBackButton from "components/lagacy/useBackButton";
import WhiteSpace from "components/_atoms/WhiteSpace";
import WingBlank from "components/_atoms/WingBlank";
import NavHeaderDetail from "components/_molecules/NavHeaderDetail";
import StrategyCardBox from "components/_molecules/StrategyCardBox";
import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import useStrategyDetail from "states/react-query/strategy/useStrategyDetail";
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
  const params = useParams() as { id: string };
  const strategyCode = params?.id || 0;
  if (strategyCode === 0) {
    history.push("/");
  }

  const { strategyDetailQuery } = useStrategyDetail(strategyCode + "");
  const memberStrategy = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy,
    [strategyDetailQuery?.data]
  );
  const backBtn = useBackButton();
  return (
    <>
      <NavHeaderDetail
        linkTo={
          process.env.PUBLIC_URL +
          `/takers/strategy-search/details/${strategyCode}`
        }
        headerTitle="전략 생성 하기"
      />
      <WingBlank>
        {strategyDetailQuery.isLoading && "loading..."}
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
        <WingBlank>
          <Title title={"기본 설정"} />
          <List renderHeader={() => ""}>
            <InputItem clear placeholder="eg) 1번 전략">
              전략이름
            </InputItem>
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <Title title={"사용자 설정"} />
          <List renderHeader={() => ""}>
            <InputItem clear placeholder="투자 시작 금액을 입력해주세요.">
              원금
            </InputItem>
            <InputItem clear placeholder="거래당 발생하는 수수료">
              수수료%
            </InputItem>
          </List>
          <WhiteSpace />
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
    </>
  );
};

export default MockInvestCreate;
