import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/common/_atoms/Buttons';
import WingBlank from 'components/common/_atoms/WingBlank';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import styled from 'styled-components';
import TitleSection from 'pages/common/template/titleSection';
import HeaderSection from 'pages/common/template/headerSection';
import TopNavigation from 'pages/takers/layout/template/TopNavigation';

const LandingPage = () => {
  return (
    <SLadingPage>
      <WingBlank>
        <HeaderSection />
        <TitleSection />
        <WhiteSpace />
        <div>-------------</div>
        <div className="mainTitle">
          알고리당,
          <br />
          퀀트 투자로 달콤해지다
        </div>
        <WhiteSpace />
        <WhiteSpace />
        <nav>
          <ul>x 
            <Button className="btn" type="info">
              <Link className="link" to="takers/ticker-search">
                <li data-tut="reactour__search">전략 탐색 하기</li>
              </Link>
            </Button>
            <WhiteSpace marginV="0.5" />
            <Button className="btn" type="info">
              <Link className="link" to="makers">
                <li data-tut="reactour__maker">전략 생성 하기</li>
              </Link>
            </Button>
            <WhiteSpace />
          </ul>
        </nav>
      </WingBlank>
    </SLadingPage>
  );
};

// const tourConfig = [
//   {
//     selector: '[data-tut="reactour__search"]',
//     content: `Ok, let's start with the name of the Tour that is about to begin.`,
//   },
//   {
//     selector: '[data-tut="reactour__maker"]',
//     content: `And this is our cool bus...`,
//   },
// ];

export default LandingPage;

const SLadingPage = styled.section`
  .mainTitle {
    display: flex;
    font-style: normal;
    font-weight: bold;
    font-size: 2.8rem;
    line-height: 3.8rem;
  }
  .btn {
    height: 4.5rem;
    font-size: 1.7rem;
    line-height: 1.6rem;
    .link {
      width: 100%;
      text-align: center;
    }
  }
`;
