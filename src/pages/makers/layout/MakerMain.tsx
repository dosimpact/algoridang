import React from "react";
import styled from "styled-components";
import { WingBlank, WhiteSpace } from "antd-mobile";
import { Link, Route } from "react-router-dom";
import StrategyCreateC from "../strategy-create/strategy-createC";
import StrategyMyC from "../strategy-my/strategy-myC";
import StrategyPublicC from "../strategy-public/strategy-publicC";

const NavigationContainer = () => {
  return (
    <section className="navigation">
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <SHeader>
        <WingBlank className="hwrapper">
          {/* <div className="icon">🥞</div> */}
          <Link to="/makers">
            <div className="headerName">알고리당</div>
            <div className="headerSubName">Makers</div>
          </Link>
        </WingBlank>
      </SHeader>
      <WhiteSpace size="xl" />
      <SNav>
        <Link to="/makers">
          <div className="navItem flexCenter">퀀트 전략 생성</div>
        </Link>
        <Link to="/makers/strategy-my">
          <div className="navItem flexCenter">나의 전략</div>
        </Link>
        <Link to="/makers/strategy-public">
          <div className="navItem flexCenter">공개 전략</div>
        </Link>
      </SNav>
    </section>
  );
};
const SHeader = styled.header`
  .hwrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    .icon {
    }
    .headerName {
      font-size: 7.5rem;
      font-weight: 700;
    }
    .headerSubName {
      font-size: 4.5rem;
    }
  }
`;
const SNav = styled.nav`
  .navItem {
    height: 7rem;
    font-size: ${(props) => props.theme.FontSizeXXlg};
    font-weight: 700;
    background-color: ${(props) => props.theme.ColorWhite};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 1rem;
    margin-bottom: 0.2rem;
  }
  .navItem:hover {
    background-color: ${(props) => props.theme.ColorGrayL1};
  }
`;
const ContentContainer = () => {
  return (
    <section className="content">
      <Route exact path="/makers/" component={StrategyCreateC} />
      <Route exact path="/makers/strategy-my" component={StrategyMyC} />
      <Route exact path="/makers/strategy-public" component={StrategyPublicC} />
    </section>
  );
};

const MakerMainContainer = () => {
  return (
    <SMakerMainContainer>
      <NavigationContainer />
      <ContentContainer />
    </SMakerMainContainer>
  );
};
const SMakerMainContainer = styled.section`
  display: grid;
  grid-template-columns: 25rem 1fr;
`;

export default MakerMainContainer;
export { MakerMainContainer as MakersHome };
