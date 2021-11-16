import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import WingBlank from 'components/common/_atoms/WingBlank';
import StrategyCardInfoEmpty from 'components/common/_molecules/StrategyCardInfoEmpty';
import StrategyMakerList from 'components/strategy/strategy-maker-list';
import React from 'react';
import { useMyStrategy } from 'states/strategy/query/useMyStrategy';

const StrategyListC = () => {
  const { getMyStrategyListQuery } = useMyStrategy();
  return (
    <>
      {getMyStrategyListQuery.isLoading && 'loading...'}

      {!getMyStrategyListQuery.isLoading &&
      !getMyStrategyListQuery.isError &&
      getMyStrategyListQuery.data &&
      getMyStrategyListQuery.data.memberStrategyList?.length === 0 ? (
        <WingBlank>
          <WhiteSpace />
          <StrategyCardInfoEmpty message="나의 전략이 없습니다. 전략을 생성해 주세요" />
        </WingBlank>
      ) : (
        getMyStrategyListQuery.data?.memberStrategyList && (
          <StrategyMakerList
            isPublic={false}
            memberStrategyList={getMyStrategyListQuery.data?.memberStrategyList}
          />
        )
      )}
    </>
  );
};

export default StrategyListC;
