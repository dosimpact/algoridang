import StrategyCard from "components/lagacy/StrategyCard";
import React from "react";
import { useHistory } from "react-router-dom";
import { toTagsString } from "utils/parse";
import PageGuide from "components/_molecules/PageGuide";
import { IconMockInvest } from "assets/icons";
import { useMyStrategy } from "states/react-query/strategy/useMyStrategy";
import WingBlank from "components/_atoms/WingBlank";
import WhiteSpace from "components/_atoms/WhiteSpace";
import StrategyCardBox from "components/_molecules/StrategyCardBox";

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
  const { getMyStrategyListQuery } = useMyStrategy();
  console.log("getMyStrategyListQuery", getMyStrategyListQuery);

  const strategyList = React.useMemo(
    () => getMyStrategyListQuery.data?.memberStrategyList,
    [getMyStrategyListQuery]
  );
  return (
    <WingBlank>
      <PageGuide
        icon={<IconMockInvest />}
        title="모의 투자"
        subTitle="알고리당의 투자 로직에 따라 매일 모의투자를 합니다."
      />
      <WhiteSpace />
      <Title title={"나의 모의 투자 전략"} />
      <WhiteSpace />
      {getMyStrategyListQuery.isLoading && "loading..."}
      {strategyList &&
        strategyList.slice(0, 3).map((data, key) => (
          <StrategyCardBox
            key={key}
            title={data.strategy_name}
            subTitle={toTagsString(
              data.hashList?.map((e) => e?.hash?.hash_contents)
            )}
            CAGR={
              data?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(data?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={data.image_url}
            onClick={() => {
              history.push(`/takers/mock-invest/details/${data.strategy_code}`);
            }}
          />
        ))}
    </WingBlank>
  );
};

export default MockInvestList;
