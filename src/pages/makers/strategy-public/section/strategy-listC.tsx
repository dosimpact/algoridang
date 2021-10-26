import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import WingBlank from 'components/common/_atoms/WingBlank';
import StrategyCardInfoEmpty from 'components/common/_molecules/StrategyCardInfoEmpty';
import StrategyMakerList from 'components/strategy/strategy-maker-list';
import React from 'react';
import { useMyStrategyV2 } from 'states/strategy/query/useStrategyV2';

const StrategyListC = () => {
  const { getStrategyListQuery } = useMyStrategyV2();
  return (
    <>
      {getStrategyListQuery.isLoading && 'loading...'}
      {!getStrategyListQuery.isLoading &&
      !getStrategyListQuery.isError &&
      getStrategyListQuery.data &&
      getStrategyListQuery.data.memberStrategyList?.length === 0 ? (
        <WingBlank>
          <WhiteSpace />
          <StrategyCardInfoEmpty message="공개 전략이 없습니다. 전략을 생성해 주세요" />
        </WingBlank>
      ) : (
        getStrategyListQuery.data?.memberStrategyList && (
          <StrategyMakerList
            isPublic={false}
            memberStrategyList={getStrategyListQuery.data?.memberStrategyList}
          />
        )
      )}
    </>
  );
};

export default StrategyListC;
