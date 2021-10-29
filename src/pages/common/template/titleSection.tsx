import React from 'react';
import styled from 'styled-components';
import { Fade } from 'react-awesome-reveal';
import { up } from 'styled-breakpoints';
import { Link } from 'react-router-dom';

const TitleSection = () => {
  return (
    <STitleSection>
      <Fade cascade>
        <div className="bigTitle">알고리당, 퀀트투자로</div>
        <div className="bigTitle">달콤해지다.</div>
      </Fade>
      <Fade>
        <div className="startBtns">
          <Link className="link" to="takers/ticker-search">
            <div className="startBtn">전략 탐색 하기</div>
          </Link>
        </div>
      </Fade>
    </STitleSection>
  );
};

export default TitleSection;

const STitleSection = styled.section`
  height: 90vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .bigTitle {
    font-weight: bold;
    font-size: 3rem;
    line-height: 4rem;
    ${up('md')} {
      font-weight: bold;
      font-size: 6.6rem;
      line-height: 9rem;
    }
  }
  .startBtn {
    font-weight: bold;
    margin-top: 4rem;
    color: white;
    background: #f5c956;
    border-radius: 106px;
    width: 30rem;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.2rem;
    line-height: 9rem;
    cursor: pointer;
    ${up('md')} {
    }
  }
`;
