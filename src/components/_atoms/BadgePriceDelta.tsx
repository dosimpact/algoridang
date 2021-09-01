import React from "react";
import styled from "styled-components";

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
        diffPercentage: diffPercentage + "%",
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
      <span>{diff.diffValue}</span>
      <span>({diff.diffPercentage})</span>
    </SBadgePriceDelta>
  );
};

export default BadgePriceDelta;

const SBadgePriceDelta = styled.div<{ isPositive: boolean }>`
  background-color: ${(props) =>
    props.isPositive
      ? props.theme.ColorMainLightRed
      : props.theme.ColorMainLightBlue};
  font-size: 1.2rem;
  font-weight: 100;
  border-radius: 1.1rem;
  padding: 0.5rem 1.1rem;
  min-width: 7rem;
  min-height: 2.2rem;
  display: inline-block;
  span {
    color: ${(props) =>
      props.isPositive ? props.theme.ColorMainRed : props.theme.ColorMainBlue};
  }
  span:nth-child(1) {
    margin-right: 0.3rem;
  }
`;
