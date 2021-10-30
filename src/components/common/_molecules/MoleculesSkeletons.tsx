import React from 'react';
import styled from 'styled-components';
import WhiteSpace from '../_atoms/WhiteSpace';
import WingBlank from '../_atoms/WingBlank';
import StrategyCardInfoSkeleton from './StrategyCardInfoSkeleton';
import Skeleton from 'react-loading-skeleton';

export const StrategyDetailsSectionSmSkeleton = () => {
  return (
    <>
      <WhiteSpace />
      <Skeleton
        style={{ marginBottom: '1rem', height: '3rem', width: '15rem' }}
      />
    </>
  );
};

export const SectionMdSkeleton = () => {
  return (
    <>
      <WhiteSpace />
      <Skeleton
        style={{ marginBottom: '1rem', height: '3rem', width: '10rem' }}
      />
      <WhiteSpace />
      <Skeleton count={4} style={{ marginBottom: '1rem', height: '3rem' }} />
    </>
  );
};

export const SectionLgSkeleton = () => {
  return (
    <>
      <WhiteSpace />
      <Skeleton
        style={{ marginBottom: '1rem', height: '3rem', width: '15rem' }}
      />
      <WhiteSpace />
      <Skeleton style={{ marginBottom: '1rem', height: '20rem' }} />
    </>
  );
};

export const SectionBodyLgSkeleton = () => {
  return (
    <>
      <WhiteSpace />
      <Skeleton style={{ marginBottom: '1rem', height: '20rem' }} />
    </>
  );
};

export const StrategyDetailsSkeleton: React.FC<{
  NavHeaderDetail: JSX.Element;
}> = ({ NavHeaderDetail }) => {
  return (
    <SStrategyDetailsSkeleton>
      {NavHeaderDetail}
      <WingBlank>
        <WhiteSpace />
        <StrategyCardInfoSkeleton />
        <Skeleton count={3} style={{ marginBottom: '1rem', height: '3rem' }} />
        <WhiteSpace />
        <WhiteSpace />
        <Skeleton
          style={{ marginBottom: '1rem', height: '3rem', width: '15rem' }}
        />
        <WhiteSpace />
        <Skeleton style={{ marginBottom: '1rem', height: '30rem' }} />
      </WingBlank>
    </SStrategyDetailsSkeleton>
  );
};

const SStrategyDetailsSkeleton = styled.section`
  .articleReturnsStatus {
    .name {
      color: ${(props) => props.theme.ColorGray};
    }
    .value {
      color: ${(props) => props.theme.ColorYellow};
      font-weight: 600;
    }
    .returnsValue {
      font-size: ${(props) => props.theme.FontSizeXXlg};
    }
  }
  .articleTrading {
  }
  .articleHistory {
  }
  .midsize-btn {
    width: 9rem;
    height: 3rem;
  }
`;
