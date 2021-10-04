import { WingBlank, WhiteSpace } from 'antd-mobile';
import StrategyCard from 'components/lagacy/StrategyCard';
import useBackButton from 'components/lagacy/useBackButton';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useStrategy from 'states/strategy/query/useStrategy';
import { toTagsString } from 'utils/parse';

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <h1 style={{ fontSize: '20px', fontWeight: 700 }}>{title}</h1>;
};

const StrategyTypes = () => {
  const history = useHistory();
  const Back = useBackButton();
  const {
    strategyListNeutral,
    strategyListRiskTaking,
    strategyListStableIncome,
  } = useStrategy();

  return (
    <WingBlank style={{ margin: '15x' }} size="lg">
      <WhiteSpace size="xl" />
      {Back()}
      <WhiteSpace size="xl" />
      <Title title={'위험 추구형'} />
      <WhiteSpace size="xl" />
      {strategyListRiskTaking &&
        strategyListRiskTaking.map((data, key) => (
          <StrategyCard
            key={key}
            title={data.strategy_name}
            subTitle={toTagsString(
              data.hashList?.map((e) => e?.hash?.hash_contents),
            )}
            CAGR={
              data?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(data?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={data.image_url}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))}
      <WhiteSpace size="xl" />
      <Title title={'중립형'} />
      <WhiteSpace size="xl" />
      {strategyListNeutral &&
        strategyListNeutral.map((data, key) => (
          <StrategyCard
            key={key}
            title={data.strategy_name}
            subTitle={toTagsString(
              data.hashList?.map((e) => e?.hash?.hash_contents),
            )}
            CAGR={
              data?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(data?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={data.image_url}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))}
      <Title title={'수익 안정형'} />
      <WhiteSpace size="xl" />
      {strategyListStableIncome &&
        strategyListStableIncome.map((data, key) => (
          <StrategyCard
            key={key}
            title={data.strategy_name}
            subTitle={toTagsString(
              data.hashList?.map((e) => e?.hash?.hash_contents),
            )}
            CAGR={
              data?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(data?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={data.image_url}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))}
    </WingBlank>
  );
};

export default StrategyTypes;
