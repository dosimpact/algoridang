import React from 'react';
import styled from 'styled-components';
import TickerFuzzySearch from './common/_molecules/TickerFuzzySearch';
import Skeleton from 'react-loading-skeleton';
import StrategyCardInfoSkeleton from './common/_molecules/StrategyCardInfoSkeleton';
// import { GqlPrac02 } from 'components/test/gql-prac/gql-prac-02';
// import { GqlPrac03 } from "components/test/gql-prac/gql-prac-03";
// import { GqlPrac04 } from "components/test/gql-prac/gql-prac-04";
// import { GqlPrac05 } from "components/test/gql-prac/gql-prac-05";
// import { GqlPrac06 } from 'components/test/gql-prac/gql-prac-06';

const Test = () => {
  return (
    <STest>
      <StrategyCardInfoSkeleton />
      <h2>Test</h2>
      <Skeleton /> <br />
      <Skeleton count={5} /> <br />
      <div
        style={{
          border: '1px solid #ccc',
          display: 'block',
          lineHeight: 2,
          padding: '1rem',
          marginBottom: '0.5rem',
          width: 100,
        }}
      >
        <Skeleton circle={true} style={{ width: 50, height: 50 }} />
      </div>
      <Skeleton count={5} /> <br />
      <Skeleton count={5} />
      <TickerFuzzySearch
        onSuccess={(e) => {
          console.log(e);
        }}
        onKeyDownEnter={(e) => {
          console.log(e);
        }}
      ></TickerFuzzySearch>
    </STest>
  );
};

export default Test;

const STest = styled.div``;
