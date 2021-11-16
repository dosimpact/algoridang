import React from 'react';
import styled from 'styled-components';

// 수익률에 따라서 빨/회/파 의 색상을 가진다.
const BadgeCAGR: React.FC<{
  val: number | undefined;
  props?: any;
  hasPercentage?: boolean;
}> = ({ val, hasPercentage = false, ...props }) => {
  // 주의 , val === 0 이면 false 값인데, 수익률이 0인것은 if의 도메인과 다른 궤이다.
  return (
    <SBadgeCAGR num={val} {...props}>
      {val !== undefined ? (
        <span>
          연수익 {Math.round(val * 100)}
          {hasPercentage ? '%' : ''}
        </span>
      ) : (
        <span>백테스팅 성공</span>
      )}
    </SBadgeCAGR>
  );
};

const SBadgeCAGR = styled.span<{ num: number | undefined }>`
  background-color: ${(props) =>
    props.num === undefined
      ? props.theme.ColorMainLightGreen
      : props.num === 0
      ? props.theme.ColorMainLightGray
      : props.num > 0
      ? props.theme.ColorMainLightRed
      : props.theme.ColorMainLightBlue};
  color: ${(props) =>
    props.num === undefined
      ? props.theme.ColorMainGreen
      : props.num === 0
      ? props.theme.ColorMainGray
      : props.num > 0
      ? props.theme.ColorMainRed
      : props.theme.ColorMainBlue};

  font-size: 1.2rem;
  font-weight: 100;
  border-radius: 1.1rem;
  padding: 0.6rem 1.1rem;
  min-width: 7rem;
  min-height: 2.3rem;
  display: inline-block;

  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.1rem;
  span {
    white-space: nowrap;
  }
`;

export default BadgeCAGR;
