import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import WingBlank from 'components/common/_atoms/WingBlank';
import PageGuide from 'components/common/_molecules/PageGuide';

import { IconSearchStrategy } from 'assets/icons';
import SectionTitle from 'components/common/_molecules/SectionTitle';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import StrategyCardInfo from 'components/common/_molecules/StrategyCardInfo';
import StrategySearchInput from 'components/common/_organisms/StrategySearchInput';
import useSearchStrategy from 'states/strategy/query/useSearchStrategy';
import StrategyCardInfoSkeleton from 'components/common/_molecules/StrategyCardInfoSkeleton';
import StrategyCardInfoEmpty from 'components/common/_molecules/StrategyCardInfoEmpty';

// todo:refactor CAGR 부분 DB Relation eager 처리 및 undefined 핸들링
const StrategyTerm = () => {
  const urlParams = useParams<{ term: string }>();
  const history = useHistory();
  const term = urlParams['term'];

  const searchStrategyQueryTypeName = useSearchStrategy({
    term,
    type: 'name',
  }).searchStrategyQuery;

  const searchStrategyQueryTypeTicker = useSearchStrategy({
    term,
    type: 'ticker',
  }).searchStrategyQuery;

  console.log('searchStrategyQueryTypeName', searchStrategyQueryTypeName);

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
      <SectionTitle title="종목 검색 결과" />
      <WhiteSpace />

      {searchStrategyQueryTypeTicker.isLoading ? (
        [...new Array(3)].map(() => <StrategyCardInfoSkeleton />)
      ) : searchStrategyQueryTypeTicker?.data?.memberStrategyList?.length ===
        0 ? (
        <StrategyCardInfoEmpty />
      ) : (
        searchStrategyQueryTypeTicker?.data?.memberStrategyList &&
        searchStrategyQueryTypeTicker?.data?.memberStrategyList.map(
          (data, key) => (
            <StrategyCardInfo
              key={key}
              strategy={data}
              onClick={() => {
                history.push(
                  `/takers/strategy-search/details/${data.strategy_code}`,
                );
              }}
            />
          ),
        )
      )}

      <WhiteSpace />
      <SectionTitle title="이름 검색 결과" />
      <WhiteSpace />
      {searchStrategyQueryTypeName.isLoading ? (
        [...new Array(3)].map(() => <StrategyCardInfoSkeleton />)
      ) : searchStrategyQueryTypeName?.data?.memberStrategyList?.length ===
        0 ? (
        <StrategyCardInfoEmpty />
      ) : (
        searchStrategyQueryTypeName?.data?.memberStrategyList &&
        searchStrategyQueryTypeName?.data?.memberStrategyList.map(
          (data, key) => (
            <StrategyCardInfo
              key={key}
              strategy={data}
              onClick={() => {
                history.push(
                  `/takers/strategy-search/details/${data.strategy_code}`,
                );
              }}
            />
          ),
        )
      )}
    </WingBlank>
  );
};

export default StrategyTerm;
