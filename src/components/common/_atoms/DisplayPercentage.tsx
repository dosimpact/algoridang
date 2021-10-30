import React from 'react';
import styled from 'styled-components';

// 수익률에 따라서 빨/회/파 의 색상을 가진다.
const DisplayPercentage: React.FC<{
  val: number | undefined;
  props?: any;
}> = ({ val, ...props }) => {
  // 주의 , val === 0 이면 false 값인데, 수익률이 0인것은 if의 도메인과 다른 궤이다.
  return (
    <SDisplayPercentage
      numType={val === undefined || val === 0 ? 0 : val > 0 ? 1 : -1}
      {...props}
    >
      {val !== undefined ? (
        <span>{Number(val * 100).toFixed(1)}%</span>
      ) : (
        <span></span>
      )}
    </SDisplayPercentage>
  );
};

const SDisplayPercentage = styled.span<{ numType: number | undefined }>`
  color: ${(props) =>
    props.numType === 1
      ? props.theme.ColorRed
      : props.numType === -1
      ? props.theme.ColorBlue
      : props.theme.ColorGray};
  font-weight: 500;
`;

export default DisplayPercentage;
