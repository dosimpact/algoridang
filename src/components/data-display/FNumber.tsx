import React from "react";
import styled from "styled-components";

const FNumber: React.FC<{
  val: number;
  props: any;
}> = ({ val, ...props }) => {
  return (
    <FNumberS num={0} {...props}>
      val
    </FNumberS>
  );
};

const FNumberS = styled.div<{ num: number }>`
  color: ${(props) =>
    props.num === 0
      ? props.theme.ColorGray
      : props.num > 0
      ? props.theme.ColorRed
      : props.theme.ColorBlue};
`;

export default FNumber;
