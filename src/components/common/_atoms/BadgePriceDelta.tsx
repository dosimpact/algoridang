import React from 'react';
import styled from 'styled-components';

// 어제보다 -300(원) 0.38% 떨어졌네 를 표현
const BadgePriceDelta: React.FC<{ today?: number; yesterday?: number }> = ({
  today,
  yesterday,
}) => {
  const diff = React.useMemo(() => {
    if (today && yesterday) {
      const diffValue = today - yesterday;
      const diffPercentage = Number((today / yesterday) * 100 - 100).toFixed(2);
      return {
        diffValue,
        diffPercentage: diffPercentage + '%',
      };
    } else {
      return {
        diffValue: NaN,
        diffPercentage: `%`,
      };
    }
  }, [today, yesterday]);

  const isPositive = diff.diffValue > 0 || false;

  return (
    <SBadgePriceDelta isPositive={isPositive}>
      <div className="wrapper">
        {diff.diffValue} ({diff.diffPercentage})
      </div>
    </SBadgePriceDelta>
  );
};

export default BadgePriceDelta;

const SBadgePriceDelta = styled.div<{ isPositive: boolean }>`
  background-color: ${(props) =>
    props.isPositive
      ? props.theme.ColorMainLightRed
      : props.theme.ColorMainLightBlue};
  font-size: 1.3rem;
  font-weight: 400;
  border-radius: 2.4rem;
  padding: 1rem;
  min-width: 10rem;
  min-height: 3.3rem;
  display: inline-block;

  .wrapper {
    display: flex;
    justify-content: center;
    color: ${(props) =>
      props.isPositive ? props.theme.ColorMainRed : props.theme.ColorMainBlue};
    text-align: center;
  }
`;
