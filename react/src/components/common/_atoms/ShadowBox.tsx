import React from 'react';
import styled from 'styled-components';

export const ShadowBox: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  [props: string]: any;
}> = ({ children, type, style, ...props }) => {
  return (
    <SShadowBox
      style={{
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      {children}
    </SShadowBox>
  );
};

const SShadowBox = styled.div`
  padding: 1.2rem;
  border-radius: 0.4rem;
  ${(props) => props.theme.shadowLine1};
`;
