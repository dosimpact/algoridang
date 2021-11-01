import React from 'react';
import Test from 'components/Test';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from '../pages/common/landing-page';
import { TakersHome } from '../pages/takers/layout/TakerMain';
import { MakersHome } from '../pages/makers/layout/MakerMain';
import Page404 from './error-page/Page404';
import PrivacyPolicy from 'pages/common/PrivacyPolicy';
import ServicePolicy from 'pages/common/ServicePolicy';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/takers" component={TakersHome} />
        <Route path="/makers" component={MakersHome} />
        <Route path="/privacy-policy" exact component={PrivacyPolicy} />
        <Route path="/service-policy" exact component={ServicePolicy} />
        <Route path="/test" component={Test} />
        <Route component={Page404} />
        {/* <Redirect from="*" to="/" /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
