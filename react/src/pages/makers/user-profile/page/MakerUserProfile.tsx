import UserProfile from 'components/member/_organisms/UserProfile';
import React from 'react';
import styled from 'styled-components';
import BG from './bg-1.jpg';

const MakerUserProfile = () => {
  return (
    <SMakerUserProfile>
      <div className="col1">
        <UserProfile />
      </div>
      <div className="col2">
        <img className="bg" src={BG} alt="bg" />
      </div>
    </SMakerUserProfile>
  );
};

export default MakerUserProfile;

const SMakerUserProfile = styled.section`
  display: grid;
  grid-template-columns: minmax(40rem, 1fr) 1fr;

  .col2 {
    .bg {
      width: auto;
      height: 99vh;
    }
  }
`;
