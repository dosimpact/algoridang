import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
/**
 * 박스형 전략탐색 카드
 */

const StrategyCardInfoSkeleton = () => {
  return (
    <>
      <SStrategyCardInfoSkeleton>
        <article className="left"></article>
        <article className="right">
          <Skeleton count={3} style={{ marginBottom: '1rem' }} />
        </article>
      </SStrategyCardInfoSkeleton>
    </>
  );
};

const SStrategyCardInfoSkeleton = styled.section`
  background-color: white;
  transition: box-shadow 0.2s ease-in-out;
  ${(props) => props.theme.shadowLine1};
  border-radius: 7px;

  min-height: 10rem;
  height: 12rem;
  width: 100%;

  display: grid;
  grid-template-columns: 10rem 1fr;
  margin-bottom: 20px;
  cursor: pointer;
  .left {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  .right {
    padding: 2.2rem 1.2rem 0rem 1.5rem;
  }
`;

export default StrategyCardInfoSkeleton;
