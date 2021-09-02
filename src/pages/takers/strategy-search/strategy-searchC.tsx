import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import StrategyFeeds from "./section/strategy-feeds";
import StrategyTypes from "./section/strategy-types";
import StrategyDetails from "./section/strategy-details";
import StrategyReport from "./section/strategy-report";
import StrategyListType from "./section/strategy-list-type";

const StrategySearchC = () => {
  return (
    <Switch>
      {/* default strategy-search page section */}
      <Route
        exact
        path={process.env.PUBLIC_URL + "/takers/strategy-search"}
        component={StrategyFeeds}
      />
      <Route
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
      <Route
        exact
        path={process.env.PUBLIC_URL + "/takers/strategy-search/list/:type"}
        component={StrategyListType}
      />
      <Redirect to={process.env.PUBLIC_URL + "/takers/strategy-search"} />
    </Switch>
  );
};

export default StrategySearchC;
