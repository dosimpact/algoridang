import React from 'react';
import styled from 'styled-components';
import { Fade } from 'react-awesome-reveal';
import { up } from 'styled-breakpoints';
import { Link } from 'react-router-dom';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import { Button } from 'components/common/_atoms/Buttons';

const VideoSection = () => {
  return (
    <SVideoSection>
      <video
        className="videoSection"
        width="100%"
        height="auto"
        autoPlay={true}
        muted
        loop
        src={process.env.PUBLIC_URL + '/video/mock-1.mov'}
      ></video>
      {/* <div className="bigTitle">지금 시작</div> */}
    </SVideoSection>
  );
};

export default VideoSection;

const SVideoSection = styled.section`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  .videoSection {
  }
  .bigTitle {
    position: absolute;
    font-weight: bold;
    font-size: 3rem;
    line-height: 4rem;
    ${up('md')} {
      font-weight: bold;
      font-size: 6.6rem;
      line-height: 9rem;
    }
  }
`;
