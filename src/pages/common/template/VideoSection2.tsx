import React from 'react';
import styled from 'styled-components';
import { Fade } from 'react-awesome-reveal';
import { up } from 'styled-breakpoints';

const VideoSection2 = () => {
  return (
    <SVideoSection2>
      <video
        width="70%"
        height="auto"
        autoPlay={true}
        muted
        loop
        src={process.env.PUBLIC_URL + '/video/mock-3.mov'}
      ></video>
      <div className="titleOverlap">
        <Fade cascade>
          <div className="yTitle">전략탐색</div>
          <div className="bTitle">다양한 퀀트전략</div>
        </Fade>
      </div>
    </SVideoSection2>
  );
};

export default VideoSection2;

const SVideoSection2 = styled.section`
  position: relative;
  display: flex;
  flex-flow: column nowrap;

  .titleOverlap {
    position: absolute;
    width: 100vw;
    height: 100%;
    display: flex;
    align-items: flex-end;
    flex-flow: column nowrap;
    padding-right: 5vw;
    padding-top: 5vw;
    ${up('md')} {
      font-weight: bold;
      font-size: 6.6rem;
      line-height: 9rem;
    }
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
      color: white;
      background: #f5c956;
      border-radius: 106px;
      width: 10rem;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      line-height: 9rem;
      cursor: pointer;
      ${up('md')} {
        width: 30rem;
        height: 7rem;
        font-size: 2.2rem;
      }
    }
    .blue {
      background-color: ${(props) => props.theme.ColorMainBlue};
    }
  }
`;
