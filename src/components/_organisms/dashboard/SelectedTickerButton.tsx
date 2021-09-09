import React from "react";
import styled from "styled-components";

export interface ISelectedTickerButton {
  title?: string;
}
// TODO 로고 변화율
const SelectedTickerButton: React.FC<ISelectedTickerButton> = ({ title }) => {
  return (
    <SSelectedTickerButton>
      <div>로고</div>
      <div> {(title && title) || "title"}</div>
      <div>변화율</div>
    </SSelectedTickerButton>
  );
};

export default SelectedTickerButton;

const SSelectedTickerButton = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
