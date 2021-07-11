import React from "react";
import Test from "components/Test";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "../pages/common/landing-page";
import { TakersHome } from "../pages/takers/home/homeC";
import { MakersHome } from "../pages/makers/home/homeC";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/takers" exact component={TakersHome} />
        <Route path="/makers" exact component={MakersHome} />
        <Route path="/test" component={Test} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
