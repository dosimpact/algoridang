import React from "react";
import styled from "styled-components";
import { WingBlank, WhiteSpace } from "antd-mobile";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import StrategyCreateTemplate from "../strategy-create/strategy-create-template";
import StrategyMyC from "../strategy-my/strategy-myC";
import StrategyPublicC from "../strategy-public/strategy-publicC";
import { ErrorHandler } from "states/recoil/error-state";

const NavigationContainer = () => {
  return (
    <SNavigationContainer className="navigation">
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <SHeader>
        <Link to="/makers/strategy-create">
          <WingBlank className="hwrapper">
            {/* <div className="icon">🥞</div> */}
            <div className="headerName">알고</div>
            <div className="headerName">리당</div>
            <div className="headerSubName">Makers</div>
          </WingBlank>
        </Link>
      </SHeader>
      <WhiteSpace size="xl" />
      <SNav>
        <Link to="/makers/strategy-create">
          <div className="navItem flexCenter">퀀트 전략 생성</div>
        </Link>
        <Link to="/makers/strategy-my">
          <div className="navItem flexCenter">나의 전략</div>
        </Link>
        <Link to="/makers/strategy-public">
          <div className="navItem flexCenter">공개 전략</div>
        </Link>
      </SNav>
    </SNavigationContainer>
  );
};

const SNavigationContainer = styled.section`
  width: 100%;
`;

const SHeader = styled.header`
  .hwrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    .icon {
    }
    .headerName {
      font-size: 0.75rem;
      font-weight: 700;
    }
    .headerSubName {
      font-size: 0.75rem;
    }
  }
`;
const SNav = styled.nav`
  .navItem {
    height: 7rem;
    font-size: 0.75rem;
    font-weight: 700;
    background-color: ${(props) => props.theme.ColorWhite};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 1rem;
    margin-bottom: 0.2rem;
    text-align: center;
  }
  .navItem:hover {
    background-color: ${(props) => props.theme.ColorGrayL1};
  }
`;
const ContentContainer = () => {
  return (
    <section className="content">
      <Switch>
        <Route
          path="/makers/strategy-create"
          component={StrategyCreateTemplate}
        />
        <Route path="/makers/strategy-my" component={StrategyMyC} />
        <Route path="/makers/strategy-public" component={StrategyPublicC} />
        <Redirect from="*" to="/makers/strategy-create" />
      </Switch>
    </section>
  );
};

const MakerMainContainer = () => {
  return (
    <SMakerMainContainer>
      <NavigationContainer />
      <ErrorHandler>
        <ContentContainer />
      </ErrorHandler>
    </SMakerMainContainer>
  );
};
const SMakerMainContainer = styled.section`
  display: grid;
  grid-template-columns: 8rem 1fr;
  min-height: 100vh;
`;

export default MakerMainContainer;
export { MakerMainContainer as MakersHome };
