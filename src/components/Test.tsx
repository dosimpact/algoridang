import React from 'react';
import { useRecoilState } from 'recoil';
import {
  atomQSHeader,
  selectorQSHeaderData,
  selectorQSHeaderStretegy,
} from 'states/common/recoil/dashBoard/QuantSelect';
import useStrategyDetail from 'states/strategy/query/useStrategyDetail';
import styled from 'styled-components';
import StrategyDetailsVM from './strategy/template/strategy-details-VM';
// import TickerFuzzySearch from './common/_molecules/TickerFuzzySearch';
// import Skeleton from 'react-loading-skeleton';
// import StrategyCardInfoSkeleton from './common/_molecules/StrategyCardInfoSkeleton';
// import StrategyCardInfoEmpty from './common/_molecules/StrategyCardInfoEmpty';
// import { GqlPrac02 } from 'components/test/gql-prac/gql-prac-02';
// import { GqlPrac03 } from "components/test/gql-prac/gql-prac-03";
// import { GqlPrac04 } from "components/test/gql-prac/gql-prac-04";
// import { GqlPrac05 } from "components/test/gql-prac/gql-prac-05";
// import { GqlPrac06 } from 'components/test/gql-prac/gql-prac-06';

const Test = () => {
  const [QSHeader] = useRecoilState(atomQSHeader);
  const [QSHeaderStretegy, setQSHeaderStretegy] = useRecoilState(
    selectorQSHeaderStretegy,
  );
  // numberOfData 는 0 으로 setter의 대상에서 제외
  // strategy 는 1 으로 setter의 대상에서 on
  const [QSHeaderData, setQSHeaderData] = useRecoilState(
    selectorQSHeaderData({ numberOfData: 0, strategy: 1 }),
  );
  const { strategyDetailQuery } = useStrategyDetail('2746');
  return (
    <STest>
      <StrategyDetailsVM strategyCode={'2761'} showType="detail" />
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      {/* <pre>
        {JSON.stringify(
          strategyDetailQuery.data?.memberStrategy?.backtestDetailInfo
            .quant_state_report,
          null,
          2,
        )}
      </pre> */}
      {strategyDetailQuery.data?.memberStrategy?.backtestDetailInfo
        .quant_state_report && (
        <div
          dangerouslySetInnerHTML={{
            __html:
              strategyDetailQuery.data?.memberStrategy?.backtestDetailInfo
                .quant_state_report,
          }}
        ></div>
      )}
      <div>hello</div> <div>hello</div> <div>hello</div> <div>hello</div>
      {/* <pre>{JSON.stringify(QSHeader, null, 2)}</pre>
      <pre>{JSON.stringify(QSHeaderStretegy, null, 2)}</pre>
      <button
        onClick={() => {
          setQSHeaderStretegy(10);
        }}
      >
        setQSHeaderStretegy
      </button>
      <pre>{JSON.stringify(QSHeaderData, null, 2)}</pre>
      <button
        onClick={() => {
          setQSHeaderData({ numberOfData: 11, strategy: 11 });
        }}
      >
        setQSHeaderData
      </button> */}
    </STest>
  );
};

export default Test;

const STest = styled.div``;
