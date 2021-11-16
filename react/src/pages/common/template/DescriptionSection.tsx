import React from 'react';
import styled from 'styled-components';
import { Fade } from 'react-awesome-reveal';
import { up } from 'styled-breakpoints';
import { Link } from 'react-router-dom';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import { Button } from 'components/common/_atoms/Buttons';
import WingBlank from 'components/common/_atoms/WingBlank';

const DescriptionSection = () => {
  return (
    <SDescriptionSection>
      <WingBlank>
        <div className="midTitle">
          알고리당은 <br />
          퀀트 전략 설계를 통해 <br />
          개인투자자들에게
          <br /> 일관적 투자성향을 <br />
          제공하는 SW플랫폼 입니다
        </div>
      </WingBlank>
    </SDescriptionSection>
  );
};

export default DescriptionSection;

const SDescriptionSection = styled.section`
  background-color: #fff8e5;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .midTitle {
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    line-height: 3rem;
    ${up('md')} {
      font-size: 3.5rem;
      line-height: 4.5rem;
    }
  }
`;
