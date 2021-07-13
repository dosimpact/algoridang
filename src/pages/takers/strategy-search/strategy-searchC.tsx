import React from "react";
import { Route, Switch } from "react-router-dom";
import StrategyFeeds from "./section/strategy-feeds";
import StrategyTypes from "./section/strategy-types";
import StrategyDetails from "./section/strategy-details";
import StrategyReport from "./section/strategy-report";

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
        path={process.env.PUBLIC_URL + "/takers/strategy-search/details/:id"}
        component={StrategyDetails}
      />
      <Route
        exact
        path={process.env.PUBLIC_URL + "/takers/strategy-search/report/:id/"}
        component={StrategyReport}
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
