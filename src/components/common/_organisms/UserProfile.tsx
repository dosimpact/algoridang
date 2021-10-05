import React from 'react';
import { useForm } from 'react-hook-form';
import useMember from 'states/member/query/useMember';
import styled from 'styled-components';
import { Button } from '../_atoms/Buttons';
import { Title } from '../_atoms/Typos';
import WhiteSpace from '../_atoms/WhiteSpace';
import WideLine from '../_atoms/WideLine';
import WingBlank from '../_atoms/WingBlank';
import NavHeaderDetail from '../_molecules/NavHeaderDetail';

const LoggedIn = () => {
  const { logIn, logOut, me } = useMember();

  return (
    <SLoggedIn>
      <NavHeaderDetail headerTitle="회원 정보" />
      <Button onClick={logOut} className="btn" type="blue">
        로그아웃
      </Button>
      {JSON.stringify(me.data, null, 2)}
    </SLoggedIn>
  );
};
const SLoggedIn = styled.section``;

const LoginForm = () => {
  const { logIn } = useMember();
  const { trigger, register, handleSubmit } = useForm();
  const handleLogin = () => {
    // logIn;
  };
  return (
    <div>
      <form>
        <input type="text" placeholder="이메일" />
        <input type="text" placeholder="비밀번호" />
        <Button onClick={handleLogin} className="btn" type="normal">
          로그인
        </Button>
      </form>
    </div>
  );
};

const LoggedOut = () => {
  const { logIn } = useMember();
  const handleMockupLogin = () => {
    logIn({
      email_id: 'ypd03008@gmail.com',
      password: 'ypd03008',
    });
  };
  return (
    <SLoggedOut>
      <WhiteSpace marginV="4" />
      <div className="mainTitle">
        알고리당,
        <br />
        퀀트 투자로 달콤해지다
      </div>
      <WhiteSpace />
      <Button onClick={handleMockupLogin} className="btn" type="info">
        게스트로 둘러보기
      </Button>
      <WhiteSpace />
      <LoginForm />

      <WideLine />
      <div className="socialLogin">
        <Button onClick={logIn} className="btn" type="blue">
          구글 로그인
        </Button>
      </div>
      <WhiteSpace />
    </SLoggedOut>
  );
};
const SLoggedOut = styled.section`
  .mainTitle {
    display: flex;
    font-style: normal;
    font-weight: bold;
    font-size: 2.8rem;
    line-height: 3.8rem;
  }
`;

const UserProfile = () => {
  const { me } = useMember();
  return (
    <SUserProfile>
      <WingBlank>
        {!me.isLoading && me.data ? <LoggedIn /> : <LoggedOut />}
      </WingBlank>
    </SUserProfile>
  );
};

export default UserProfile;

const SUserProfile = styled.section`
  max-width: 40rem;
  margin: 0 auto;
  .btn {
    height: 4.5rem;
    font-size: 1.7rem;
    line-height: 1.6rem;
  }
`;
