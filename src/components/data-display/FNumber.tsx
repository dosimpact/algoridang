import React from "react";
import styled from "styled-components";

const FNumber: React.FC<{
  val: number;
  props?: any;
  hasPercentage?: boolean;
}> = ({ val, hasPercentage = false, ...props }) => {
  return (
    <FNumberS num={val} {...props}>
      {val * 100}
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
