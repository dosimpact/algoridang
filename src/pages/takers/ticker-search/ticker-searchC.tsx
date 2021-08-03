import React from "react";
import { Route, Switch } from "react-router-dom";
import TickerPrice from "./section/ticker-price";

const TickerSearchC = () => {
  return (
    <div>
      <Switch>
        {/* default mock-invest page section */}
        <Route
          exact
          path={process.env.PUBLIC_URL + "/takers/"}
          component={TickerPrice}
        />
      </Switch>
    </div>
  );
};

export default TickerSearchC;
