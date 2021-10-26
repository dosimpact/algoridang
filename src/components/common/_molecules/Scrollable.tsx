import { IconScrollArrow } from 'assets/icons';
import React from 'react';
import styled from 'styled-components';

const Scrollable = () => {
  return (
    <SScrollable>
      <IconScrollArrow />
      <IconScrollArrow />
    </SScrollable>
  );
};

export default Scrollable;

const SScrollable = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  span {
    display: inline-block;
  }
  svg {
    /* animation: bounce 1s ease-ease-in-out; */
  }
  svg:nth-child(1) {
    transform: rotate(0.5turn);
    display: flex;
    justify-content: center;
    align-self: center;
  }
`;
