import React, { useState } from 'react';
import { Button } from 'components/common/_atoms/Buttons';
import useMember from 'states/member/query/useMember';
import NavHeaderDetail from 'components/common/_molecules/NavHeaderDetail';
import styled from 'styled-components';

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

export default LoggedIn;
