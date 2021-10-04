import React from 'react';
import StrategyReport from 'components/strategy/strategy-report';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SupdateBasic from './supdate-basic';

// show basic setting
// CAGR, MDD
// 투자수익현황
// 매매 타점
// 히스토리

// 상세정보
// 누적수익률 차트
// 월간수익률 차트
// 승률 차트

const StrategyDetailContainer = () => {
  const location = useLocation();
  console.log(location);

  return (
    <SStrategyDetailContainer>
      <SupdateBasic />
      <div className="containerStrategyReport">
        <StrategyReport />
      </div>
    </SStrategyDetailContainer>
  );
};

export default StrategyDetailContainer;
export { StrategyDetailContainer as StrategyDetail };

const SStrategyDetailContainer = styled.article`
  padding: 4rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 50rem 65rem;
  .containerStrategyReport {
  }
`;
