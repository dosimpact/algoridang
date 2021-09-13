import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import StrategyDetailContainer from './section/strategy-public-detailC';
import StrategyListC from './section/strategy-listC';

const StrategyPublicC = () => {
  const location = useLocation();
  console.log(location);

  return (
    <Switch>
      <Route
        exact
        path={process.env.PUBLIC_URL + '/makers/strategy-public'}
        component={StrategyListC}
      />
      <Route
        path={process.env.PUBLIC_URL + '/makers/strategy-public/detail/:id'}
        component={StrategyDetailContainer}
      />
      <Redirect
        from="*"
        to={process.env.PUBLIC_URL + '/makers/strategy-public'}
      />
    </Switch>
  );
};

export default StrategyPublicC;
export { StrategyPublicC as StrategyPublic };
