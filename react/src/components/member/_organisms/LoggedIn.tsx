import React from 'react';
import { Button } from 'components/common/_atoms/Buttons';
import useMember from 'states/member/query/useMember';
import NavHeaderDetail from 'components/common/_molecules/NavHeaderDetail';
import styled from 'styled-components';
import { SubTitle } from 'components/common/_atoms/Typos';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';

const LoggedIn = () => {
  const { logOut, me } = useMember();

  return (
    <SLoggedIn>
      <NavHeaderDetail headerTitle="회원 정보" />
      <WhiteSpace marginV="2" />

      <SubTitle title="이메일" />
      <WhiteSpace marginV=".3" />
      <div>{me.data?.email_id}</div>
      <WhiteSpace />

      <SubTitle title="이름" />
      <WhiteSpace marginV=".3" />
      <div>{me.data?.member_name}</div>

      <WhiteSpace />
      <Button onClick={logOut} className="btn" type="blue">
        로그아웃
      </Button>
    </SLoggedIn>
  );
};
const SLoggedIn = styled.section``;

export default LoggedIn;
