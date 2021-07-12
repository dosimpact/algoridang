import React from "react";
import StrategySearchP from "./strategy-searchP";
import { Route, Switch } from "react-router-dom";
import StrategyFeeds from "./section/strategy-feeds";
import StrategyTypes from "./section/strategy-types";

const StrategySearchC = () => {
  return (
    <Switch>
      <Route
        exact
        path={process.env.PUBLIC_URL + "/takers/"}
        component={StrategyFeeds}
      />
      <Route
        exact
        path={process.env.PUBLIC_URL + "/takers/strategy-search/types"}
        component={StrategyTypes}
      />
    </Switch>
  );
};

export default StrategySearchC;
