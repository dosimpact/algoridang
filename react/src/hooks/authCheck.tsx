import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
// import { auth } from '../_actions/user_actions';
// import { useSelector, useDispatch } from 'react-redux';
import { getLocalMemberInfo } from 'states/local-state';
const authCheck = (
  ComposedClass: React.FC<any>,
  needLoggedIn: boolean | null,
  adminRoute: boolean | null = null,
) => {
  function AuthenticationCheck(props: unknown) {
    // let user = useSelector((state) => state.user);
    // const dispatch = useDispatch();
    const user = getLocalMemberInfo();
    const history = useHistory();

    const location = useLocation();
    const isInTakers = location.pathname.startsWith('/takers');
    const isInMakers = location.pathname.startsWith('/makers');

    useEffect(() => {
      const { token } = user;
      if (token === '') {
        // loggedout 상태
        if (needLoggedIn) {
          if (isInTakers) history.push('/takers/user-profile');
          if (isInMakers) history.push('/makers/user-profile');
        }
      } else {
        // loggedin 상태
      }
    }, [user, history, isInTakers, isInMakers]);
    return <ComposedClass {...props} />;
  }
  return AuthenticationCheck;
};
export default authCheck;
