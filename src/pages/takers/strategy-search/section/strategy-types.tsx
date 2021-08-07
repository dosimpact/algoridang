import { WingBlank, WhiteSpace } from "antd-mobile";
import StrategyCard from "components/strategy/StrategyCard";
import useBackButton from "hooks/useBackButton";
import React from "react";
import { useHistory } from "react-router-dom";
import useStrategy from "states/react-query/strategy/useStrategy";
import { toTagsString } from "utils/parse";

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <h1 style={{ fontSize: "20px", fontWeight: 700 }}>{title}</h1>;
};
// const dummyDatas2 = [
//   {
//     title: "삼성전자 황금 신호",
//     subTitle: ["단일 종목", "골든 크로스"],
//     CAGR: 22.22,
//   },
//   {
//     title: "싸질만큼 싸진 바이오 제약주 Top10",
//     subTitle: ["바이오 섹터", "블린저 매매"],
//     CAGR: 10.91,
//   },
// ];
// const dummyDatas3 = [
//   {
//     title: "골드 기업 종합 점수 Top20 ",
//     subTitle: ["F-Score", "골든 크로스"],
//     CAGR: 22.22,
//   },
// ];
const StrategyTypes = () => {
  const history = useHistory();
  const Back = useBackButton();
  const {
    strategyListNeutral,
    strategyListRiskTaking,
    strategyListStableIncome,
  } = useStrategy();

  return (
    <WingBlank style={{ margin: "15x" }} size="lg">
      <WhiteSpace size="xl" />
      {Back()}
      <WhiteSpace size="xl" />
      <Title title={"위험 추구형"} />
      <WhiteSpace size="xl" />
      {strategyListRiskTaking &&
        strategyListRiskTaking.map((data, key) => (
          <StrategyCard
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
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`
              );
            }}
          />
        ))}
      <WhiteSpace size="xl" />
      <Title title={"중립형"} />
      <WhiteSpace size="xl" />
      {strategyListNeutral &&
        strategyListNeutral.map((data, key) => (
          <StrategyCard
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
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`
              );
            }}
          />
        ))}
      <Title title={"수익 안정형"} />
      <WhiteSpace size="xl" />
      {strategyListStableIncome &&
        strategyListStableIncome.map((data, key) => (
          <StrategyCard
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
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`
              );
            }}
          />
        ))}
    </WingBlank>
  );
};

export default StrategyTypes;
