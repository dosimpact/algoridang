import authCheck from 'hooks/authCheck';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MockInvestBackTestReport from './section/mock-invest-bt-report';
import MockInvestCreate from './section/mock-invest-create';
import MockInvestDetail from './section/mock-invest-detail';
import MockInvestFeed from './section/mock-invest-feeds';
import MockInvestReport from './section/mock-invest-report';
import MockInvestUpdate from './section/mock-invest-update';

const MockInvestC = () => {
  return (
    <>
      <Switch>
        {/* default mock-invest page section */}
        <Route
          exact
          path={process.env.PUBLIC_URL + '/takers/mock-invest'}
          component={authCheck(MockInvestFeed, true)}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/takers/mock-invest/details/:id'}
          component={MockInvestDetail}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/takers/mock-invest/report/:id'}
          component={MockInvestReport}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/takers/mock-invest/bt-report/:id/'}
          component={MockInvestBackTestReport}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/takers/mock-invest/create/:id/'}
          component={MockInvestCreate}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/takers/mock-invest/update/:id'}
          component={MockInvestUpdate}
        />
        <Redirect
          from={process.env.PUBLIC_URL + '/takers/mock-invest'}
          to={process.env.PUBLIC_URL + '/takers/mock-invest'}
        />
      </Switch>
    </>
  );
};

export default MockInvestC;
