import React from 'react';
import { useHistory } from 'react-router-dom';
import PageGuide from 'components/common/_molecules/PageGuide';
import { IconMockInvest } from 'assets/icons';
import { useMyStrategy } from 'states/strategy/query/useMyStrategy';
import WingBlank from 'components/common/_atoms/WingBlank';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import StrategyCardInfo from 'components/common/_molecules/StrategyCardInfo';
import SectionTitle from 'components/common/_molecules/SectionTitle';
import StrategyCardInfoSkeleton from 'components/common/_molecules/StrategyCardInfoSkeleton';
import StrategyCardInfoEmpty from 'components/common/_molecules/StrategyCardInfoEmpty';

const MockInvestFeeds = () => {
  const history = useHistory();
  const { getMyStrategyListQuery } = useMyStrategy();

  const strategyList = React.useMemo(
    () => getMyStrategyListQuery.data?.memberStrategyList,
    [getMyStrategyListQuery],
  );
  return (
    <WingBlank>
      <PageGuide
        icon={<IconMockInvest />}
        title="모의 투자"
        subTitle={`알고리당의 투자 로직에 따라
매일 모의투자를 합니다.
        `}
      />
      <SectionTitle title="나의 모의 투자 전략" />
      <WhiteSpace />
      {!strategyList ? (
        [...new Array(4)].map((e, idx) => (
          <StrategyCardInfoSkeleton key={idx} />
        ))
      ) : strategyList.length === 0 ? (
        <StrategyCardInfoEmpty />
      ) : (
        strategyList.map((data, key) => (
          <StrategyCardInfo
            key={key}
            strategy={data}
            isDisplayMock={true}
            onClick={() => {
              history.push(`/takers/mock-invest/details/${data.strategy_code}`);
            }}
          />
        ))
      )}
    </WingBlank>
  );
};

export default MockInvestFeeds;
