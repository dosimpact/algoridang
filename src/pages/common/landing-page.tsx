import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/common/_atoms/Buttons';
import WingBlank from 'components/common/_atoms/WingBlank';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import styled from 'styled-components';
import TitleSection from 'pages/common/template/titleSection';
import HeaderSection from 'pages/common/template/headerSection';
import SectionIntro from './template/SectionIntro';
import { up } from 'styled-breakpoints';
import { Fade } from 'react-awesome-reveal';

const LandingPage = () => {
  return (
    <SLadingPage>
      <WingBlank>
        <HeaderSection />
        <TitleSection />
      </WingBlank>
      <article className="section_mockImg section_mock">
        <div className="blackCover"></div>
        <WingBlank>
          <Fade cascade>
            <div className="yTitle">모의 투자 시작하기</div>
            <div className="wTitle">
              오늘부터 알고리즘 모의투자
              <br /> 누적수익을 쌓아보세요
            </div>
          </Fade>
        </WingBlank>
      </article>
      <article>
        <WingBlank>
          <Fade cascade>
            <div className="yTitle">백테스팅</div>
            <div className="bTitle">
              나만의 전략으로 <br />
              일관성 있게 투자 했을때
              <br /> 누적 수익 확인해 보셨나요?
            </div>
          </Fade>
        </WingBlank>
      </article>

      <article className="section_mockImg section_backtest">
        <WingBlank>
          <div className="blackCover"></div>
          <Fade cascade>
            <div className="yTitle">백테스팅</div>
            <div className="wTitle">
              나만의 전략으로 <br />
              일관성 있게 투자 했을때
              <br /> 누적 수익 확인해 보셨나요?
            </div>
          </Fade>
        </WingBlank>
      </article>
      <WingBlank>
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
          <ul>
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
  .yTitle {
    color: ${(props) => props.theme.ColorMainYellow};
    font-weight: bold;
    font-size: 3rem;
    line-height: 4rem;
    ${up('md')} {
      font-weight: bold;
      font-size: 3.3rem;
      line-height: 9rem;
    }
  }
  .bTitle {
    font-weight: bold;
    font-size: 3rem;
    line-height: 4rem;
    ${up('md')} {
      font-weight: bold;
      font-size: 6rem;
      line-height: 9rem;
    }
  }
  .wTitle {
    color: white;
    font-weight: bold;
    font-size: 3rem;
    line-height: 4rem;
    ${up('md')} {
      font-weight: bold;
      font-size: 6rem;
      line-height: 9rem;
    }
  }
  .section_mockImg {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    min-height: 100vh;
    width: 100vw;

    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    position: relative;
  }
  .section_mock {
    background-image: url(${(props) =>
      process.env.PUBLIC_URL + '/img/mockup-maker01.jpg'});
  }
  .section_backtest {
    align-items: flex-start;
    background-image: url(${(props) =>
      process.env.PUBLIC_URL + '/img/mockup-taker01.jpg'});
  }
  .blackCover {
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    width: 100vw;
    height: 100%;
    opacity: 0.6;
  }
`;
