import React from 'react';
import { useHistory } from 'react-router-dom';
import useStrategy from 'states/react-query/strategy/useStrategy';
import { toTagsString, toTickerImage } from 'utils/parse';
import WingBlank from 'components/_atoms/WingBlank';
import PageGuide from 'components/_molecules/PageGuide';

import { IconSearchStrategy } from 'assets/icons';
import SectionTitle from 'components/_molecules/SectionTitle';
import WhiteSpace from 'components/_atoms/WhiteSpace';
import StrategyCardBox from 'components/_molecules/StrategyCardBox';

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
  console.log('strategyListRiskTaking', strategyListRiskTaking);
  return (
    <WingBlank>
      <PageGuide
        icon={<IconSearchStrategy />}
        title="전략 탐색"
        subTitle="수익률을 확인하고 원하는 전략으로 모의투자를 시작해 보세요."
      />
      <SectionTitle
        title="신규 투자 전략"
        linkTo={process.env.PUBLIC_URL + '/takers/strategy-search/list/new'}
      />
      <WhiteSpace />
      {strategyListNew &&
        strategyListNew.slice(0, 3).map((data, key) => (
          <StrategyCardBox
            key={key}
            title={data.strategy_name}
            subTitle={toTagsString(
              data.hashList?.map((e) => e?.hash?.hash_contents),
            )}
            CAGR={
              data?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(data?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={
              data.universal.length >= 1
                ? toTickerImage(data.universal[0].ticker)
                : ''
            }
            onErrorImg={data.image_url}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))}
      <WhiteSpace />
      <SectionTitle
        title="조회수 높은 투자 전략"
        linkTo={
          process.env.PUBLIC_URL + '/takers/strategy-search/list/high-view'
        }
      />
      <WhiteSpace />
      {strategyListHighView &&
        strategyListHighView.slice(0, 3).map((data, key) => (
          <StrategyCardBox
            key={key}
            title={data.strategy_name}
            subTitle={toTagsString(
              data.hashList?.map((e) => e?.hash?.hash_contents),
            )}
            CAGR={
              data?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(data?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={
              data.universal.length >= 1
                ? toTickerImage(data.universal[0].ticker)
                : ''
            }
            onErrorImg={data.image_url}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))}
      <WhiteSpace />
      <SectionTitle
        title="위험 추구형 투자 전략"
        linkTo={
          process.env.PUBLIC_URL + '/takers/strategy-search/list/risk-taking'
        }
      />
      <WhiteSpace />
      {strategyListRiskTaking &&
        strategyListRiskTaking.slice(0, 3).map((data, key) => (
          <StrategyCardBox
            key={key}
            title={data.strategy_name}
            subTitle={toTagsString(
              data.hashList?.map((e) => e?.hash?.hash_contents),
            )}
            CAGR={
              data?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(data?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={
              data.universal.length >= 1
                ? toTickerImage(data.universal[0].ticker)
                : ''
            }
            onErrorImg={data.image_url}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))}
      <WhiteSpace />
      <SectionTitle
        title="중립형 투자 전략"
        linkTo={process.env.PUBLIC_URL + '/takers/strategy-search/list/neutral'}
      />
      <WhiteSpace />
      {strategyListNeutral &&
        strategyListNeutral.slice(0, 3).map((data, key) => (
          <StrategyCardBox
            key={key}
            title={data.strategy_name}
            subTitle={toTagsString(
              data.hashList?.map((e) => e?.hash?.hash_contents),
            )}
            CAGR={
              data?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(data?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={
              data.universal.length >= 1
                ? toTickerImage(data.universal[0].ticker)
                : ''
            }
            onErrorImg={data.image_url}
            onClick={() => {
              history.push(
                `/takers/strategy-search/details/${data.strategy_code}`,
              );
            }}
          />
        ))}
      <WhiteSpace />
      <SectionTitle
        title="수익 안정형 투자 전략"
        linkTo={
          process.env.PUBLIC_URL + '/takers/strategy-search/list/stable-income'
        }
      />
      <WhiteSpace />
      {strategyListStableIncome &&
        strategyListStableIncome.slice(0, 3).map((data, key) => (
          <StrategyCardBox
            key={key}
            title={data.strategy_name}
            subTitle={toTagsString(
              data.hashList?.map((e) => e?.hash?.hash_contents),
            )}
            CAGR={
              data?.backtestDetailInfo?.year_avg_profit_rate &&
              Number(data?.backtestDetailInfo?.year_avg_profit_rate)
            }
            thumnail={
              data.universal.length >= 1
                ? toTickerImage(data.universal[0].ticker)
                : ''
            }
            onErrorImg={data.image_url}
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

export default StrategyFeeds;
