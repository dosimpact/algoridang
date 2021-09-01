import { WhiteSpace } from "antd-mobile";
import StrategyCard from "components/strategy/StrategyCard";
import StrategyCardInfo from "components/_modecules/StrategyCardInfo";
import React from "react";
import { useHistory } from "react-router-dom";
import useStrategy from "states/react-query/strategy/useStrategy";
import { toTagsString } from "utils/parse";
import WingBlank from "components/_atoms/WingBlank";
import PageGuide from "components/_modecules/PageGuide";

import { IconSearchStrategy } from "assets/icons";
import { Title } from "components/_atoms/Typo";
import SectionTitle from "components/_modecules/SectionTitle";

// todo:refactor CAGR 부분 DB Relation eager 처리 및 undefined 핸들링
const StrategyFeeds = () => {
  const history = useHistory();
  const { strategyListNew, strategyListHighView } = useStrategy();
  // console.log("strategyListNew", strategyListNew);

  return (
    <WingBlank>
      <PageGuide
        icon={<IconSearchStrategy />}
        title="전략 탐색"
        subTitle="수익률을 확인하고 전략으로 모의투자를 시작해 보세요."
      />
      <WhiteSpace size="xl" />
      <StrategyCardInfo
        title="투자 성향별 종목 검색"
        subTitle="나만의 성향에 맞는 전략 찾아봅니다."
        onClick={(e) => {
          // console.log("click", e.currentTarget);
          history.push("/takers/strategy-search/types");
        }}
      />
      <WhiteSpace size="xl" />
      <SectionTitle title="신규 투자 전략" linkTo="/" />
      <WhiteSpace size="xl" />
      {strategyListNew &&
        strategyListNew.map((data, key) => (
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
      <Title title={"조회수 높은 투자 전략"} />
      <WhiteSpace size="xl" />
      {strategyListHighView &&
        strategyListHighView.map((data, key) => (
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

export default StrategyFeeds;
