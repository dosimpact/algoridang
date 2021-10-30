import React from 'react';
import MockInvest from '../mock-invest/mock-investC';
import StrategySearch from '../strategy-search/strategy-searchC';
import TickerSearch from '../ticker-search/ticker-searchC';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  IconMockInvest,
  IconSearchStrategy,
  IconSearchTicker,
} from 'assets/icons';
import Helmet from 'react-helmet';
import useMobileSetting from 'hooks/useMobileSetting';
import { ErrorHandler } from 'states/common/recoil/error-state';
import UserProfile from '../user-profile/user-profileC';

export const URLList = {
  tickerSearch: {
    url: '/takers/ticker-search',
  },
  strategySearch: {
    url: '/takers/strategy-search',
  },
  mockInvest: {
    url: '/takers/mock-invest',
  },
  userProfile: {
    url: '/takers/user-profile',
  },
} as const;

const BottomNavigation = () => {
  const location = useLocation();
  const history = useHistory();
  React.useLayoutEffect(() => {
    let haveToPush = true;
    for (let value of Object.values(URLList)) {
      if (location.pathname.startsWith(value.url)) {
        haveToPush = false;
      }
    }
    if (haveToPush) history.push(URLList.tickerSearch.url);
    return () => {};
  }, [history, location.pathname]);

  return (
    <SBottomNavigation>
      <ul className="navList">
        <Link
          className="navItemLink"
          to={process.env.PUBLIC_URL + URLList.tickerSearch.url}
        >
          <SNavItem
            selected={location.pathname.startsWith(URLList.tickerSearch.url)}
          >
            <div className="icon">
              <IconSearchTicker />
            </div>
            <div className="navText">종목 탐색</div>
          </SNavItem>
        </Link>

        <Link
          className="navItemLink"
          to={process.env.PUBLIC_URL + URLList.strategySearch.url}
        >
          <SNavItem
            selected={location.pathname.startsWith(URLList.strategySearch.url)}
          >
            <div className="icon">
              <IconSearchStrategy />
            </div>
            <div className="navText">전략 탐색</div>
          </SNavItem>
        </Link>

        <Link
          className="navItemLink"
          to={process.env.PUBLIC_URL + URLList.mockInvest.url}
        >
          <SNavItem
            selected={location.pathname.startsWith(URLList.mockInvest.url)}
          >
            <div className="icon">
              <IconMockInvest />
            </div>
            <div className="navText">모의 투자</div>
          </SNavItem>
        </Link>
      </ul>
    </SBottomNavigation>
  );
};

const SBottomNavigation = styled.section<{ isDown?: boolean }>`
  position: fixed;
  bottom: 0rem;
  width: 100%;
  max-width: 75rem;
  height: 6rem;
  background-color: ${(props) => props.theme.ColorMainDarkGray};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  z-index: 10;
  ${(props) => (props.isDown ? `transform: translate(0, 5.6rem);` : '')}
  .navList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
    padding: 0.5rem;
    .navItemLink {
      height: 100%;
    }
  }
`;

const SNavItem = styled.li<{ selected?: boolean }>`
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  .icon {
    svg {
      fill: ${(props) =>
        props.selected
          ? props.theme.ColorMainYellow
          : props.theme.ColorMainWhite};
    }
  }
  .navText {
    margin-top: 0.5rem;
    font-size: 1.15rem;
    color: ${(props) =>
      props.selected
        ? props.theme.ColorMainYellow
        : props.theme.ColorMainWhite};
    font-weight: 100;
  }
`;

const TakerMainSection = () => {
  return (
    <STakerMainSection>
      <section>
        <TickerSearch />
      </section>
      <section>
        <StrategySearch />
      </section>
      <section>
        <MockInvest />
      </section>
      <section>
        <UserProfile />
      </section>
    </STakerMainSection>
  );
};

const STakerMainSection = styled.section`
  background-color: ${(props) => props.theme.ColorWhite};
  min-height: 100vh;
  padding-bottom: 8rem;
`;

const TakerConfig = () => {
  useMobileSetting();
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,target-densitydpi=medium-dpi"
        />
      </Helmet>
    </>
  );
};

const TakerMainContainer = () => {
  return (
    <div style={{ background: '#F6F6F6' }}>
      <section style={{ maxWidth: '75rem', margin: '0 auto' }}>
        <TakerConfig />
        {/* <TopNavigation /> */}
        <div>
          <ErrorHandler>
            <TakerMainSection />
          </ErrorHandler>
        </div>
        <BottomNavigation />
        {/* <BottomGradient /> */}
      </section>
    </div>
  );
};

export default TakerMainContainer;
export { TakerMainContainer as TakersHome };
