import React from 'react';
import WingBlank from 'components/common/_atoms/WingBlank';
import styled from 'styled-components';
import TitleSection from 'pages/common/template/titleSection';
import HeaderSection from 'pages/common/template/headerSection';
import { up } from 'styled-breakpoints';
import { Fade } from 'react-awesome-reveal';
import DescriptionSection from './template/DescriptionSection';
import VideoSection1 from './template/VideoSection1';
import VideoSection2 from './template/VideoSection2';

const LandingPage = () => {
  return (
    <SLadingPage>
      <WingBlank>
        <HeaderSection />
      </WingBlank>

      <VideoSection1 />
      <DescriptionSection />

      <article className="section section_mockImg section_mock">
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

      <article className="section">
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

      <article className="section section_mockImg section_stSearch">
        <WingBlank>
          <div className="blackCover"></div>
          <Fade cascade>
            <div className="yTitle">전략탐색</div>
            <div className="wTitle">
              다중 종목에 대한
              <br /> 기본적 분석
              <br />
              기술적 분석 제공
            </div>
          </Fade>
        </WingBlank>
      </article>

      {/*  */}
      <VideoSection2 />
      {/*  */}
      <TitleSection />
    </SLadingPage>
  );
};

export default LandingPage;

const SLadingPage = styled.section`
  .takersPCView {
    display: none;
    ${up('md')} {
      display: block;
    }
  }
  .makersPCView {
    display: none;
    ${up('md')} {
      display: block;
    }
  }
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
    font-size: 2rem;
    line-height: 4rem;
    ${up('md')} {
      font-size: 3.3rem;
      line-height: 9rem;
    }
  }
  .bTitle {
    font-weight: bold;
    font-size: 3rem;
    line-height: 4rem;
    ${up('md')} {
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
      font-size: 6rem;
      line-height: 9rem;
    }
  }
  .section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 100vh;
    width: 100vw;
  }
  .section_mockImg {
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
  }
  .section_mock {
    background-size: contain;
    background-image: url('/img/mockup-maker01.jpg');
  }
  .section_stSearch {
    background-size: cover;
    ${up('md')} {
      background-size: unset;
    }
    align-items: flex-start;
    background-image: url('/img/mockup-taker01.jpg');
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
