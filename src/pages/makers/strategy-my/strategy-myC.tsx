import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import StrategyDetail from "./section/strategy-detail";
import StrategyList from "./section/strategy-list";

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
        path={process.env.PUBLIC_URL + "/makers/strategy-my"}
        component={StrategyList}
      />
      <Route
        path={process.env.PUBLIC_URL + "/makers/strategy-my/detail/:id"}
        component={StrategyDetail}
      />
      <Redirect from="*" to={process.env.PUBLIC_URL + "/makers/strategy-my"} />
    </Switch>
  );
};

export default StrategyMyC;
export { StrategyMyC as StrategyMy };
