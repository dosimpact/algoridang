import React from 'react';
import styled from 'styled-components';
import { BoxType } from './Box';

// button type :
//
export const Button: React.FC<{
  type?: BoxType;
  className?: string;
  style?: React.CSSProperties;
  [props: string]: any;
}> = ({ children, type, style, ...props }) => {
  return (
    <SButton
      type={type || 'normal'}
      style={{
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      {children}
    </SButton>
  );
};

const SButton = styled.div<{
  type: BoxType;
}>`
  min-width: 7.7rem;
  min-height: 3rem;
  border-radius: 0.5rem;

  background-color: ${(props) =>
    (props.type === 'normal' && props.theme.ColorMainYellow) ||
    (props.type === 'gray' && props.theme.ColorMainLightGray) ||
    (props.type === 'success' && props.theme.ColorMainLightGreen) ||
    (props.type === 'warn' && props.theme.ColorMainLightYellow) ||
    (props.type === 'info' && props.theme.ColorMainLightBlue) ||
    (props.type === 'blue' && props.theme.ColorMainBlue) ||
    (props.type === 'danger' && props.theme.ColorMainLightRed)};

  color: ${(props) =>
    (props.type === 'normal' && props.theme.ColorMainWhite) ||
    (props.type === 'gray' && props.theme.ColorMainGray) ||
    (props.type === 'success' && props.theme.ColorMainGreen) ||
    (props.type === 'warn' && props.theme.ColorMainYellow) ||
    (props.type === 'info' && props.theme.ColorMainBlue) ||
    (props.type === 'blue' && props.theme.ColorWhite) ||
    (props.type === 'danger' && props.theme.ColorMainRed)};

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 500;
  line-height: 1.4rem;
  font-size: 1.4rem;
`;
