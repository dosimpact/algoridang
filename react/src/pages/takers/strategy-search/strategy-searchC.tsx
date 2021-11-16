import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import StrategyFeeds from './section/strategy-feeds';
import StrategyTypes from './section/strategy-types';
import StrategyDetails from './section/strategy-details';
import StrategyReport from './section/strategy-report';
import StrategyBackTestReport from './section/strategy-bt-report';
import StrategyListType from './section/strategy-list-type';
import StrategyTerm from './section/strategy-term';

const StrategySearchC = () => {
  return (
    <Switch>
      {/* default strategy-search page section */}
      <Route
        exact
        path={process.env.PUBLIC_URL + '/takers/strategy-search'}
        component={StrategyFeeds}
      />
      <Route
        exact
        path={process.env.PUBLIC_URL + '/takers/strategy-search/term/:term'}
        component={StrategyTerm}
      />
      <Route
        path={process.env.PUBLIC_URL + '/takers/strategy-search/details/:id'}
        component={StrategyDetails}
      />
      <Route
        exact
        path={process.env.PUBLIC_URL + '/takers/strategy-search/report/:id/'}
        component={StrategyReport}
      />
      <Route
        exact
        path={process.env.PUBLIC_URL + '/takers/strategy-search/bt-report/:id/'}
        component={StrategyBackTestReport}
      />
      <Route
        exact
        path={process.env.PUBLIC_URL + '/takers/strategy-search/types'}
        component={StrategyTypes}
      />
      <Route
        exact
        path={process.env.PUBLIC_URL + '/takers/strategy-search/list/:type'}
        component={StrategyListType}
      />
      <Redirect
        from={process.env.PUBLIC_URL + '/takers/strategy-search'}
        to={process.env.PUBLIC_URL + '/takers/strategy-search'}
      />
    </Switch>
  );
};

export default StrategySearchC;
