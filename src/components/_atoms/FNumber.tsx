import React from "react";
import styled from "styled-components";

// 수익률에 따라서 빨/회/파 의 색상을 가진다.
const FNumber: React.FC<{
  val: number;
  props?: any;
  hasPercentage?: boolean;
}> = ({ val, hasPercentage = false, ...props }) => {
  return (
    <FNumberS num={val} {...props}>
      {Math.round(val * 100)}
      {hasPercentage ? "%" : ""}
    </FNumberS>
  );
};

const FNumberS = styled.span<{ num: number }>`
  color: ${(props) =>
    props.num === 0
      ? props.theme.ColorGray
      : props.num > 0
      ? props.theme.ColorRed
      : props.theme.ColorBlue};
`;

export default FNumber;
