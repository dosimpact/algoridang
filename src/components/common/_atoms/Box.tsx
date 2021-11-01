import React from 'react';
import styled from 'styled-components';

// Box type :

export type BoxType =
  | 'normal'
  | 'gray'
  | 'success'
  | 'warn'
  | 'danger'
  | 'info'
  | 'blue';

export const Box: React.FC<{
  type?: BoxType;
  className?: string;
  style?: React.CSSProperties;
  [props: string]: any;
}> = ({ children, type, style, ...props }) => {
  return (
    <SBox
      type={type || 'normal'}
      style={{
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      {children}
    </SBox>
  );
};

export const SBox = styled.div<{
  type: BoxType;
}>`
  width: 3rem;
  height: 3rem;
  border-radius: 0.4rem;
  color: ${(props) =>
    (props.type === 'normal' && props.theme.ColorMainWhite) ||
    (props.type === 'gray' && props.theme.ColorMainGray) ||
    (props.type === 'success' && props.theme.ColorMainGreen) ||
    (props.type === 'danger' && props.theme.ColorMainRed)};

  background-color: ${(props) =>
    (props.type === 'normal' && props.theme.ColorMainYellow) ||
    (props.type === 'gray' && props.theme.ColorMainLightGray) ||
    (props.type === 'success' && props.theme.ColorMainLightGreen) ||
    (props.type === 'danger' && props.theme.ColorMainLightRed)};

  display: flex;
  justify-content: center;
  align-items: center;

  font-style: normal;
  font-weight: 200;
  line-height: 1.4rem;
  font-size: 1.3rem;
`;
