import { IconNavPersonNormal } from 'assets/icons';
import { useMemo } from 'react';
import { useHistory } from 'react-router';
import useMember from 'states/member/query/useMember';
import styled from 'styled-components';

const TopNavigation = () => {
  const history = useHistory();
  const { logIn, me } = useMember();
  const email = useMemo(() => {
    return me.data?.email_id;
  }, [me]);

  const handleUserProfileLink = () => {
    history.push(process.env.PUBLIC_URL + '/takers/user-profile');
  };

  return (
    <STopNavigation>
      <div
        className="logo"
        onClick={() => {
          history.push('/takers');
        }}
      >
        <img
          className="logoImage"
          alt="logoImage"
          src={process.env.PUBLIC_URL + '/img/logo_light.png'}
        ></img>
        <div className="logoText">알고리당</div>
      </div>
      <div className="authInfo">
        {/* <span className="email">
            {email ? email : <span onClick={mockUpUserLogin}>Login</span>}
          </span> */}
        <span onClick={handleUserProfileLink}>
          {/* <IconPerson /> */}
          <IconNavPersonNormal />
        </span>
      </div>
    </STopNavigation>
  );
};

const STopNavigation = styled.header`
  /* position: fixed; */
  /* top: 0; */
  /* left: 0; */

  height: 7.4rem;
  width: 100%;
  padding: 0px 2rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-content: center;
  /* background-color: ${(props) => props.theme.ColorMainDarkGray}; */
  color: ${(props) => props.theme.ColorMainDarkGray};
  z-index: 1000;

  svg {
    fill: ${(props) => props.theme.ColorMainWhite};
  }
  .logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    .logoImage {
      width: 4rem;
    }
    .logoText {
    }
  }
  .authInfo {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    .email {
      margin-right: 1.5rem;
    }
  }
  svg {
    width: 2.2rem;
  }
`;

export default TopNavigation;
