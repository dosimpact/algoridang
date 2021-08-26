import React from "react";
import { Route, Switch } from "react-router-dom";
import TickerPrice from "./section/ticker-price";

const TickerSearchC = () => {
  return (
    <>
      <Switch>
        {/* default mock-invest page section */}
        <Route
          exact
          path={process.env.PUBLIC_URL + "/takers/ticker-search"}
          component={TickerPrice}
        />
      </Switch>
    </>
  );
};

export default TickerSearchC;
