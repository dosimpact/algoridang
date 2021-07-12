import React from "react";
import Test from "components/Test";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "../pages/common/landing-page";
import { TakersHome } from "../pages/takers/layout/layout";
import { MakersHome } from "../pages/makers/layout/layout";
import { ErrorHandler } from "recoil/error-state";
import Page404 from "./error-page/Page404";
const Router = () => {
  return (
    <BrowserRouter>
      <ErrorHandler>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/takers" exact component={TakersHome} />
          <Route path="/makers" exact component={MakersHome} />
          <Route path="/test" component={Test} />
          <Route component={Page404} />
          <Redirect from="*" to="/" />
        </Switch>
      </ErrorHandler>
    </BrowserRouter>
  );
};

export default Router;
