import React from 'react';
import { useHistory } from 'react-router-dom';
import useStrategy from 'states/strategy/query/useStrategy';
import WingBlank from 'components/common/_atoms/WingBlank';
import PageGuide from 'components/common/_molecules/PageGuide';

import { IconSearchStrategy } from 'assets/icons';
import SectionTitle from 'components/common/_molecules/SectionTitle';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import StrategyCardInfo from 'components/common/_molecules/StrategyCardInfo';
import StrategySearchInput from 'components/common/_organisms/StrategySearchInput';
import StrategyCardInfoSkeleton from 'components/common/_molecules/StrategyCardInfoSkeleton';
import StrategyCardInfoEmpty from 'components/common/_molecules/StrategyCardInfoEmpty';

// todo:refactor CAGR 부분 DB Relation eager 처리 및 undefined 핸들링
const StrategyFeeds = () => {
  const history = useHistory();
  const {
    strategyListNew,
    strategyListHighView,
    strategyListNeutral,
    strategyListRiskTaking,
    strategyListStableIncome,
  } = useStrategy();
  return (
    <WingBlank>
      <PageGuide
        icon={<IconSearchStrategy />}
        title="전략 탐색"
        subTitle={`수익률을 확인하고 원하는 전략으로
모의투자를 시작해 보세요.`}
      />
      <SectionTitle title="전략 검색" />
      <StrategySearchInput />

      <WhiteSpace />
      <SectionTitle
        title="신규 투자 전략"
        linkTo={process.env.PUBLIC_URL + '/takers/strategy-search/list/new'}
      />
      <WhiteSpace marginV="1" />
      {!strategyListNew ? (
        [...new Array(3)].map((e, idx) => (
          <StrategyCardInfoSkeleton key={idx} />
        ))
      ) : strategyListNew.length === 0 ? (
        <StrategyCardInfoEmpty />
      ) : (
        strategyListNew.slice(0, 3).map((data, key) => (
          <StrategyCardInfo
            key={key}
            strategy={data}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))
      )}

      <WhiteSpace />
      <SectionTitle
        title="조회수 높은 투자 전략"
        linkTo={
          process.env.PUBLIC_URL + '/takers/strategy-search/list/high-view'
        }
      />
      <WhiteSpace />
      {!strategyListHighView ? (
        [...new Array(3)].map((e, idx) => (
          <StrategyCardInfoSkeleton key={idx} />
        ))
      ) : strategyListHighView.length === 0 ? (
        <StrategyCardInfoEmpty />
      ) : (
        strategyListHighView.slice(0, 3).map((data, key) => (
          <StrategyCardInfo
            key={key}
            strategy={data}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))
      )}
      <WhiteSpace />
      <SectionTitle
        title="위험 추구형 투자 전략"
        linkTo={
          process.env.PUBLIC_URL + '/takers/strategy-search/list/risk-taking'
        }
      />
      <WhiteSpace />
      {}
      {!strategyListRiskTaking ? (
        [...new Array(3)].map((e, idx) => (
          <StrategyCardInfoSkeleton key={idx} />
        ))
      ) : strategyListRiskTaking.length === 0 ? (
        <StrategyCardInfoEmpty />
      ) : (
        strategyListRiskTaking.slice(0, 3).map((data, key) => (
          <StrategyCardInfo
            key={key}
            strategy={data}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))
      )}
      <WhiteSpace />
      <SectionTitle
        title="중립형 투자 전략"
        linkTo={process.env.PUBLIC_URL + '/takers/strategy-search/list/neutral'}
      />
      <WhiteSpace />
      {!strategyListNeutral ? (
        [...new Array(3)].map((e, idx) => (
          <StrategyCardInfoSkeleton key={idx} />
        ))
      ) : strategyListNeutral.length === 0 ? (
        <StrategyCardInfoEmpty />
      ) : (
        strategyListNeutral.slice(0, 3).map((data, key) => (
          <StrategyCardInfo
            key={key}
            strategy={data}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))
      )}
      <WhiteSpace />
      <SectionTitle
        title="수익 안정형 투자 전략"
        linkTo={
          process.env.PUBLIC_URL + '/takers/strategy-search/list/stable-income'
        }
      />
      <WhiteSpace />
      {!strategyListStableIncome ? (
        [...new Array(3)].map((e, idx) => (
          <StrategyCardInfoSkeleton key={idx} />
        ))
      ) : strategyListStableIncome.length === 0 ? (
        <StrategyCardInfoEmpty />
      ) : (
        strategyListStableIncome.slice(0, 3).map((data, key) => (
          <StrategyCardInfo
            key={key}
            strategy={data}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))
      )}
    </WingBlank>
  );
};

export default StrategyFeeds;
