import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import StrategyDetailC from './section/strategy-my-detailC';
import StrategyListC from './section/strategy-listC';

// 1. route setting
// strategy-my
// strategy-my/detail/1

const StrategyMyC = () => {
  const location = useLocation();
  console.log(location);

  return (
    <Switch>
      <Route
        exact
        path={process.env.PUBLIC_URL + '/makers/strategy-my'}
        component={StrategyListC}
      />
      <Route
        path={process.env.PUBLIC_URL + '/makers/strategy-my/detail/:id'}
        component={StrategyDetailC}
      />
      <Redirect from="*" to={process.env.PUBLIC_URL + '/makers/strategy-my'} />
    </Switch>
  );
};

export default StrategyMyC;
export { StrategyMyC as StrategyMy };
