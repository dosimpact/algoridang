import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MakerUserProfile from './page/MakerUserProfile';

const UserProfileC = () => {
  return (
    <Switch>
      <Route
        exact
        path={process.env.PUBLIC_URL + '/makers/user-profile'}
        component={MakerUserProfile}
      />
    </Switch>
  );
};

export default UserProfileC;
export { UserProfileC as StrategyPublic };
