import React from 'react';
import styled from 'styled-components';

/**
 * 입력 아이템에 대한 상태
 * - 애러 표시
 */
interface IInputListItemH {
  error?: boolean;
  errorMessage?: string;
}
const InputListItemH: React.FC<IInputListItemH> = ({
  children,
  error,
  errorMessage,
}) => {
  return (
    <SInputListItemH error={error}>
      <div className="inputItem">{children}</div>
      <div className="errorMessage">{errorMessage}</div>
    </SInputListItemH>
  );
};

export default InputListItemH;

const SInputListItemH = styled.div<IInputListItemH>`
  .inputItem {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;

    ${(props) =>
      props.error
        ? `border-bottom: 1px solid ${props.theme.ColorMainRed}`
        : ``};
  }
  .errorMessage {
    color: ${(props) => props.theme.ColorMainRed};
    font-size: 1.3rem;
    height: 1.5rem;
  }
`;
