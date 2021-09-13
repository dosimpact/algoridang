import StrategyMakerList from 'components/strategy/strategy-maker-list';
import React from 'react';
import { useMyStrategy } from 'states/react-query/strategy/useMyStrategy';

const StrategyListC = () => {
  const { getMyStrategyListQuery } = useMyStrategy();
  return (
    <>
      {getMyStrategyListQuery.isLoading && 'loading...'}
      {!getMyStrategyListQuery.isLoading &&
        !getMyStrategyListQuery.isError &&
        getMyStrategyListQuery.data?.memberStrategyList && (
          <StrategyMakerList
            isPublic={false}
            memberStrategyList={getMyStrategyListQuery.data?.memberStrategyList}
          />
        )}
    </>
  );
};

export default StrategyListC;
