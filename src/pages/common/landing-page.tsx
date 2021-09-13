import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import useMember from 'states/react-query/useMember';
import Tour from 'reactour';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
// import SampleMarker from "components/light-weight/SampleMarker";

// todo : makers, takers 선택 저장하기

interface IAtomTodo {
  name: string;
  finished: boolean;
}
const atomTodo = atom<IAtomTodo[]>({
  key: 'atomTodo',
  default: [
    { name: 'hello1', finished: true },
    { name: 'hello2', finished: true },
    { name: 'hello3', finished: true },
  ],
});

const LandingPage = () => {
  const { logIn, me } = useMember();

  const [todo, setTodo] = useRecoilState(atomTodo);
  const handleChangeTodo = (idx: number) => {
    setTodo((prev) => {
      prev[idx] = { name: 'hacked', finished: false };
      return [...prev];
    });
  };

  const [isTourOpen, setIsTourOpen] = useState(false);
  return (
    <WingBlank>
      <div>todo test</div>
      <>
        {todo.map((e) => (
          <div>{e.name}</div>
        ))}
      </>
      <button onClick={() => handleChangeTodo(1)}>HACK</button>
      <Button
        onClick={() => {
          logIn({
            email_id: 'ypd03008@gmail.com',
            password: 'ypd03008',
          });
        }}
      >
        login
      </Button>
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
        {!me.isLoading && me?.data?.email_id} 님 ({' '}
        {!me.isLoading && me?.data?.email_id})
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
