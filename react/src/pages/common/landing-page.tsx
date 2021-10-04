import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import useMember from 'states/member/query/useMember';
import Tour from 'reactour';
import useLogin from 'hooks/useMockLogin';

const LandingPage = () => {
  const { email, mockUpUserLogin } = useLogin();

  const [isTourOpen, setIsTourOpen] = useState(false);
  return (
    <WingBlank>
      <Button onClick={mockUpUserLogin}>login</Button>
      <WhiteSpace />
      <button
        onClick={() => {
          setIsTourOpen(true);
        }}
      >
        TEST Tour
      </button>
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
      />
      <WhiteSpace />
      <h1 style={{ fontSize: '20px' }}>
        알고리당에 오신것을 환영합니다.
        <br />
        {email} 님
      </h1>
      <WhiteSpace />
      <nav>
        <ul>
          <Button type="ghost">
            <Link to="takers/ticker-search">
              <li data-tut="reactour__search">전략 탐색 하기</li>
            </Link>
          </Button>
          <WhiteSpace />
          <Button type="ghost">
            <Link to="makers">
              <li data-tut="reactour__maker">전략 생성 하기</li>
            </Link>
          </Button>
          <WhiteSpace />
        </ul>
      </nav>
    </WingBlank>
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
