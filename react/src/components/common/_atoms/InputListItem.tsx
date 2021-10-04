import React from 'react';
import styled from 'styled-components';

/**
 * 입력 아이템에 대한 상태
 * - 애러 표시
 */
interface IInputListItem {
  error?: boolean;
  errorMessage?: string;
}
const InputListItem: React.FC<IInputListItem> = ({
  children,
  error,
  errorMessage,
}) => {
  return (
    <SInputListItem error={error}>
      <div className="inputItem">{children}</div>
      <div className="errorMessage">{errorMessage}</div>
    </SInputListItem>
  );
};

export default InputListItem;

const SInputListItem = styled.div<IInputListItem>`
  .inputItem {
    height: 4rem;

    display: grid;
    grid-template-columns: 8.5rem 1fr;
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
  padding-left: 1.5rem;
  height: 5.5rem;
`;
