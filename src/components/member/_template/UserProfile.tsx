import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useMember from 'states/member/query/useMember';
import styled from 'styled-components';
import WingBlank from '../../common/_atoms/WingBlank';
import LoggedOut from '../_organisms/LoggedOut';
import LoggedIn from '../_organisms/LoggedIn';

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
