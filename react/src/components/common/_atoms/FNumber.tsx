import React from 'react';
import styled from 'styled-components';

// 수익률에 따라서 빨/회/파 의 색상을 가진다.
// 입력단위 0.1
// (toPercentage:true) 출력 10%
const FNumber: React.FC<{
  val: number;
  props?: any;
  hasPercentage?: boolean;
}> = ({ val, hasPercentage = false, ...props }) => {
  return (
    <FNumberS num={val} {...props}>
      {hasPercentage ? Math.round(val * 100) : val}
      {hasPercentage ? '%' : ''}
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
