import React from "react";
import StrategyCardImg from "components/strategy/StrategyCardImg";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// 1. get my Strategies
// 2. view list
// - grid layout
// - card output
const StrategyCardImgDummy = [
  {
    title: "삼성전자 골든 크로스",
    subTitle: "#단일종목 #골든 크로스",
    bottomText: "백테스팅 대기",
  },
  {
    title: "삼성전자 골든 크로스",
    subTitle: "#단일종목 #골든 크로스",
    bottomText: "백테스팅 진행중",
  },
  {
    title: "삼성전자 골든 크로스",
    subTitle: "#단일종목 #골든 크로스",
    bottomText: "CAGR 10.1% MDD 12",
  },
];

const StrategyList = () => {
  const history = useHistory();
  return (
    <SStrategyMyC>
      {StrategyCardImgDummy.map((e, key) => {
        return (
          <StrategyCardImg
            title={e.title}
            subTitle={e.subTitle}
            bottomText={e.bottomText}
            onClick={() => {
              history.push("/makers/strategy-my/detail/1");
            }}
          />
        );
      })}
    </SStrategyMyC>
  );
};
const SStrategyMyC = styled.article`
  padding: 4rem;
`;
export default StrategyList;
