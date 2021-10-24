import React from 'react';
import { useRecoilState } from 'recoil';
import {
  atomQSHeader,
  selectorQSHeaderData,
  selectorQSHeaderStretegy,
} from 'states/common/recoil/dashBoard/QuantSelect';
import styled from 'styled-components';
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
  const [QSHeader, setQSHeader] = useRecoilState(atomQSHeader);
  const [QSHeaderStretegy, setQSHeaderStretegy] = useRecoilState(
    selectorQSHeaderStretegy,
  );
  // numberOfData 는 0 으로 setter의 대상에서 제외
  // strategy 는 1 으로 setter의 대상에서 on
  const [QSHeaderData, setQSHeaderData] = useRecoilState(
    selectorQSHeaderData({ numberOfData: 0, strategy: 1 }),
  );
  return (
    <STest>
      <pre>{JSON.stringify(QSHeader, null, 2)}</pre>
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
      </button>
    </STest>
  );
};

export default Test;

const STest = styled.div``;
