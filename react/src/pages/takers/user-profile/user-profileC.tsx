import React from 'react';
import UserProfile from 'components/member/_organisms/UserProfile';
import { Redirect, Route, Switch } from 'react-router-dom';

const UserProfileC = () => {
  return (
    <>
      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + '/takers/user-profile'}
          component={UserProfile}
        />
        <Redirect
          from={process.env.PUBLIC_URL + '/takers/user-profile'}
          to={process.env.PUBLIC_URL + '/takers/user-profile'}
        />
      </Switch>
    </>
  );
};

export default UserProfileC;
