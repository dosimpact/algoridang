import React from 'react';
import StrategyCardImg from 'components/strategy/StrategyCardImg';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { hashListToString } from 'utils/parse';
import { MemberStrategy } from 'states/strategy/interface/entities';
// 1. get my Strategies
// 2. view list
// - grid layout
// - card output
// const StrategyCardImgDummy = [
//   {
//     title: "삼성전자 골든 크로스",
//     subTitle: "#단일종목 #골든 크로스",
//     bottomText: "백테스팅 대기",
//   },
//   {
//     title: "삼성전자 골든 크로스",
//     subTitle: "#단일종목 #골든 크로스",
//     bottomText: "백테스팅 진행중",
//   },
//   {
//     title: "삼성전자 골든 크로스",
//     subTitle: "#단일종목 #골든 크로스",
//     bottomText: "CAGR 10.1% MDD 12",
//   },
// ];

interface IStrategyMakerList {
  isPublic: boolean;
  memberStrategyList?: MemberStrategy[];
}
const StrategyMakerList: React.FC<IStrategyMakerList> = ({
  isPublic,
  memberStrategyList,
}) => {
  const history = useHistory();
  console.log('memberStrategyList', memberStrategyList);

  return (
    <SStrategyMyC>
      {memberStrategyList &&
        memberStrategyList.map((e, key) => {
          return (
            <StrategyCardImg
              title={e.strategy_name}
              thumnail={e.image_url}
              subTitle={hashListToString(e.hashList)}
              bottomText={e.strategy_name}
              onClick={() => {
                isPublic
                  ? history.push('/makers/strategy-public/detail/1')
                  : history.push('/makers/strategy-my/detail/1');
              }}
            />
          );
        })}
    </SStrategyMyC>
  );
};
const SStrategyMyC = styled.article`
  padding: 4rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 28rem));
`;
export default StrategyMakerList;
