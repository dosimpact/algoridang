import React from 'react';
import { useHistory } from 'react-router-dom';
import { toTagsString, toTickerImage } from 'utils/parse';
import PageGuide from 'components/common/_molecules/PageGuide';
import { IconMockInvest } from 'assets/icons';
import { useMyStrategy } from 'states/react-query/strategy/useMyStrategy';
import WingBlank from 'components/common/_atoms/WingBlank';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import StrategyCardBox from 'components/common/_molecules/StrategyCardBox';
import SectionTitle from 'components/common/_molecules/SectionTitle';

const MockInvestFeeds = () => {
  const history = useHistory();
  const { getMyStrategyListQuery } = useMyStrategy();
  console.log('getMyStrategyListQuery', getMyStrategyListQuery);

  const strategyList = React.useMemo(
    () => getMyStrategyListQuery.data?.memberStrategyList,
    [getMyStrategyListQuery],
  );
  return (
    <WingBlank>
      <PageGuide
        icon={<IconMockInvest />}
        title="모의 투자"
        subTitle="알고리당의 투자 로직에 따라 매일 모의투자를 합니다."
      />
      <SectionTitle
        title="나의 모의 투자 전략"
        // linkTo={process.env.PUBLIC_URL + "/takers/mock-invest/list/risk-taking"}
      />
      <WhiteSpace />
      {getMyStrategyListQuery.isLoading && 'loading...'}
      {strategyList &&
        strategyList.map((data, key) => (
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
              history.push(`/takers/mock-invest/details/${data.strategy_code}`);
            }}
          />
        ))}
    </WingBlank>
  );
};

export default MockInvestFeeds;
