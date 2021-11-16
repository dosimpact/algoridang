import React, { useState } from 'react';
import { Button } from 'components/common/_atoms/Buttons';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import WideLine from 'components/common/_atoms/WideLine';
import useMember from 'states/member/query/useMember';
import UserLoginForm from './UserLoginForm';
import styled from 'styled-components';
import UserSinginForm from './UserSignUpForm';

const LoggedOut = () => {
  // 로그인 , 회원가입
  const [isShowLoginForm, setIsShowLoginForm] = useState(true);
  const { logIn } = useMember();
  const handleMockupLogin = () => {
    logIn({
      email_id: 'ypd03008@gmail.com',
      password: 'ypd03008',
    });
  };
  return (
    <SLoggedOut>
      <div style={{ paddingBottom: '8rem' }}></div>
      <div className="mainTitle">
        알고리당,
        <br />
        퀀트 투자로 달콤해지다
      </div>
      <WhiteSpace />
      {isShowLoginForm ? <UserLoginForm /> : <UserSinginForm />}
      <WhiteSpace />
      <div
        className="switchLoginMode"
        onClick={() => {
          setIsShowLoginForm((prev) => !prev);
        }}
      >
        {isShowLoginForm ? '이메일로 회원가입' : '로그인 페이지로 돌아가기'}
      </div>
      <WhiteSpace />
      <WideLine />
      <div className="socialLogin">
        <Button onClick={handleMockupLogin} className="btn" type="blue">
          게스트로 둘러보기
        </Button>
        {/* <WhiteSpace marginV="0.5" />
        <Button onClick={logIn} className="btn" type="blue">
          구글 로그인
        </Button> */}
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
  .switchLoginMode {
    text-align: center;
    font-weight: 600;
    font-size: 1.8rem;
    cursor: pointer;
    /* color: ${(props) => props.theme.ColorGray}; */
  }
  .notice {
    text-align: center;
    color: ${(props) => props.theme.ColorGray};
    line-height: 2rem;
    margin-top: 1rem;
  }
  .underLine {
    text-decoration: underline;
  }
  .btn {
    height: 4.5rem;
    font-size: 1.7rem;
    line-height: 1.6rem;
  }
`;

export default LoggedOut;
