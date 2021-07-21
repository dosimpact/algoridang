import { WhiteSpace } from "antd-mobile";
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SupdateBasic from "./supdate-basic";

// show basic setting
// CAGR, MDD
// 투자수익현황
// 매매 타점
// 히스토리

// 상세정보
// 누적수익률 차트
// 월간수익률 차트
// 승률 차트

const StrategyDetail = () => {
  const location = useLocation();
  console.log(location);

  return (
    <SStrategyDetail>
      <WhiteSpace size="lg" />
      <SupdateBasic />
    </SStrategyDetail>
  );
};

export default StrategyDetail;

const SStrategyDetail = styled.article`
  padding: 4rem;
`;
