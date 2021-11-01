import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { up } from 'styled-breakpoints';
import styled from 'styled-components';

const SectionIntro: React.FC = ({ children }) => {
  return <SSection>{children}</SSection>;
};

export default SectionIntro;

const SSection = styled.section`
  padding: 0rem 10vw;
`;
