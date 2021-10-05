import UserProfile from 'components/member/_organisms/UserProfile';
import React from 'react';
import styled from 'styled-components';

const MakerUserProfile = () => {
  return (
    <SMakerUserProfile>
      <div className="col1">
        <UserProfile />
      </div>
      <div className="col2"></div>
    </SMakerUserProfile>
  );
};

export default MakerUserProfile;

const SMakerUserProfile = styled.section`
  display: grid;
  grid-template-columns: minmax(40rem, 1fr) 1fr;
`;
