import { WingBlank, WhiteSpace } from "antd-mobile";
import StrategyCard from "components/strategy/StrategyCard";
import React from "react";
import { useHistory } from "react-router-dom";
import useStrategy from "states/react-query/useStrategy";
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
//   {
//     title: "조엘 그린블라트의 마법공식 Top20",
//     subTitle: ["저평가", "고수익"],
//     CAGR: 12.82,
//   },
// ];
// const dummyDatas3 = [
//   {
//     title: "골드 기업 종합 점수 Top20 ",
//     subTitle: ["F-Score", "골든 크로스"],
//     CAGR: 22.22,
//   },
// ];

// todo:refactor CAGR 부분 DB Relation eager 처리 및 undefined 핸들링
const StrategyFeeds = () => {
  const history = useHistory();
  const { strategyListNew, strategyListHighView } = useStrategy();
  // console.log("strategyListNew", strategyListNew);

  return (
    <WingBlank style={{ margin: "15x" }} size="lg">
      <WhiteSpace size="xl" />
      <StrategyCard
        title="투자 성향별 종목 검색"
        subTitle="나만의 성향에 맞는 전략 찾아봅니다."
        onClick={(e) => {
          // console.log("click", e.currentTarget);
          history.push("/takers/strategy-search/types");
        }}
      />
      <WhiteSpace size="xl" />
      <Title title={"신규 투자 전략"} />
      <WhiteSpace size="xl" />
      {strategyListNew &&
        strategyListNew.map((data, key) => (
          <StrategyCard
            key={key}
            title={data.strategy_name}
            subTitle={toTagsString(
              data.hashList?.map((e) => e?.hash?.hash_contents)
            )}
            CAGR={data.strategy_code}
            thumnail={data.image_url}
            onClick={(e) => {
              history.push("/takers/strategy-search/details/1");
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
            CAGR={data.strategy_code}
            onClick={(e) => {
              history.push("/takers/strategy-search/types");
            }}
          />
        ))}
    </WingBlank>
  );
};

export default StrategyFeeds;
