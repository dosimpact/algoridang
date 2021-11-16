import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import TickerPrice from 'components/common/_organisms/ticker-price';
import TopNavigation from '../layout/template/TopNavigation';

const TickerSearchC = () => {
  return (
    <>
      <Switch>
        {/* default mock-invest page section */}
        <Route exact path={process.env.PUBLIC_URL + '/takers/ticker-search'}>
          <TopNavigation />
          <TickerPrice />
        </Route>
        <Redirect
          from={process.env.PUBLIC_URL + '/takers/ticker-search'}
          to={process.env.PUBLIC_URL + '/takers/ticker-search'}
        />
      </Switch>
    </>
  );
};

export default TickerSearchC;
