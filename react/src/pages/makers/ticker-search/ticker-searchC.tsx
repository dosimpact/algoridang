import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import TickerPrice from 'components/common/_organisms/ticker-price';

const TickerSearchC = () => {
  return (
    <>
      <Switch>
        {/* default mock-invest page section */}
        <Route
          exact
          path={process.env.PUBLIC_URL + '/makers/ticker-search'}
          component={TickerPrice}
        />
        <Redirect
          from={process.env.PUBLIC_URL + '/makers/ticker-search'}
          to={process.env.PUBLIC_URL + '/makers/ticker-search'}
        />
      </Switch>
    </>
  );
};

export default TickerSearchC;
