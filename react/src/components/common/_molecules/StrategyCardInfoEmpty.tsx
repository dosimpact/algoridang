import React from 'react';
import styled from 'styled-components';

interface IStrategyCardInfoEmpty {
  message?: string;
}

const StrategyCardInfoEmpty: React.FC<IStrategyCardInfoEmpty> = ({
  message,
}) => {
  return (
    <SStrategyCardInfoEmpty>
      <img src={process.env.PUBLIC_URL + '/img/youngBee.png'} alt="noData" />
      <div>{message ? message : '데이터가 없습니다.'}</div>
    </SStrategyCardInfoEmpty>
  );
};

const SStrategyCardInfoEmpty = styled.article`
  img {
    width: 4rem;
    margin-bottom: 1rem;
  }
  background-color: white;
  transition: box-shadow 0.2s ease-in-out;
  ${(props) => props.theme.shadowLine1};
  border-radius: 7px;

  min-height: 10rem;
  height: 12rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.ColorMainGray};
  font-size: 1.3rem;
`;

export default StrategyCardInfoEmpty;
