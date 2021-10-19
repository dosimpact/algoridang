import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMember from 'states/member/query/useMember';
import Tour from 'reactour';
import useLogin from 'hooks/useMockLogin';
import { Button } from 'components/common/_atoms/Buttons';
import WingBlank from 'components/common/_atoms/WingBlank';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import styled from 'styled-components';

const LandingPage = () => {
  const { email, mockUpUserLogin } = useLogin();

  const [isTourOpen, setIsTourOpen] = useState(false);
  return (
    <SLadingPage>
      <WingBlank>
        {/* <Button className="btn" onClick={mockUpUserLogin}>
          login
        </Button>
        <WhiteSpace />
        <Button
          className="btn"
          onClick={() => {
            setIsTourOpen(true);
          }}
        >
          TEST Tour
        </Button>
        <Tour
          onRequestClose={() => {
            setIsTourOpen(false);
          }}
          steps={tourConfig}
          isOpen={isTourOpen}
          maskClassName="mask"
          className="helper"
          rounded={5}
          accentColor={'#5cb7b7'}
          // onAfterOpen={this.disableBody}
          // onBeforeClose={this.enableBody}
        /> */}
        <WhiteSpace />
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
              <Link to="takers/ticker-search">
                <li data-tut="reactour__search">전략 탐색 하기</li>
              </Link>
            </Button>
            <WhiteSpace marginV="0.5" />
            <Button className="btn" type="info">
              <Link to="makers">
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

const tourConfig = [
  {
    selector: '[data-tut="reactour__search"]',
    content: `Ok, let's start with the name of the Tour that is about to begin.`,
  },
  {
    selector: '[data-tut="reactour__maker"]',
    content: `And this is our cool bus...`,
  },
];

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
  }
`;
