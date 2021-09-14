import React from 'react';
import styled from 'styled-components';

// DashBoardButton
// 아이콘과 타이틀이 들어가 있음
interface IDashBoardButton {
  Icon: () => JSX.Element;
  text: string;
  onClick?: () => void;
}
const DashBoardButton: React.FC<IDashBoardButton> = ({
  Icon,
  text,
  onClick,
}) => {
  return (
    <SDashBoardButton
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <Icon></Icon>
      <div>{text}</div>
    </SDashBoardButton>
  );
};

export default DashBoardButton;

const SDashBoardButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  cursor: pointer;
  padding: 1rem;
`;
