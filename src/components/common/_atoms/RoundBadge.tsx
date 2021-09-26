import React from 'react';
import styled from 'styled-components';

// 수익률에 따라서 빨/회/파 의 색상을 가진다.
const RoundBadge: React.FC<{
  type: 'Green' | 'Yellow' | 'Red' | 'Grey' | 'Blue';
}> = ({ children, ...props }) => {
  return <SRoundBadge {...props}>{children}</SRoundBadge>;
};

const SRoundBadge = styled.span<{
  type: 'Green' | 'Yellow' | 'Red' | 'Grey' | 'Blue';
}>`
  background-color: ${(props) =>
    (props.type === 'Green' && props.theme.ColorMainLightGreen) ||
    (props.type === 'Yellow' && props.theme.ColorMainLightYellow) ||
    (props.type === 'Red' && props.theme.ColorMainLightRed) ||
    (props.type === 'Grey' && props.theme.ColorMainLightGray) ||
    (props.type === 'Blue' && props.theme.ColorMainLightBlue)};

  color: ${(props) =>
    (props.type === 'Green' && props.theme.ColorMainGreen) ||
    (props.type === 'Yellow' && props.theme.ColorMainYellow) ||
    (props.type === 'Red' && props.theme.ColorMainRed) ||
    (props.type === 'Grey' && props.theme.ColorMainGray) ||
    (props.type === 'Blue' && props.theme.ColorMainBlue)};

  border-radius: 1.1rem;
  padding: 0.6rem 1.1rem;
  min-width: 7rem;
  min-height: 2.3rem;
  display: inline-block;

  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.1rem;

  text-align: center;
  margin-right: 0.7rem;

  span {
    white-space: nowrap;
  }
`;

export default RoundBadge;
