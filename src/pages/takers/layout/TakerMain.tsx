import React from "react";
import { NavBar, Icon, Tabs, WhiteSpace, Badge } from "antd-mobile";
import MockInvest from "../mock-invest/mock-investC";
import StrategySearch from "../strategy-search/strategy-searchC";
import TickerSearch from "../ticker-search/ticker-searchC";
import { Link, useHistory, useLocation } from "react-router-dom";
import useMember from "states/react-query/useMember";
import styled from "styled-components";
import {
  IconMockInvest,
  IconPerson,
  IconSearchStrategy,
  IconSearchTicker,
} from "assets/icons";
import Helmet from "react-helmet";

const tabs = [
  { title: <Badge>종목 탐색</Badge> },
  { title: <Badge text={"4"}>전략 탐색</Badge> },
  { title: <Badge text={"1"}>모의 투자</Badge> },
];

const TabNavigationContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = React.useState(0);

  // URL 로 접근하는 경우 -> 적절한 Tab으로 변경
  // http://localhost:3000/takers/mock-invest/details/1
  React.useEffect(() => {
    const checkInitLocation = () => {
      // console.log("checkInitLocation", location);
      if (location.pathname.startsWith("/takers/strategy-search")) setPage(1);
      // /takers/mock-invest 경로라면 tab=1 으로
      if (location.pathname.startsWith("/takers/mock-invest")) setPage(2);
    };
    checkInitLocation();
    return () => {};
  }, [location]);

  // 뒤로가기로 URL이 바뀌는 경우 -> 적절한 Tab으로 변경
  React.useEffect(() => {
    const unlisten = history.listen((e) => {
      // console.log("changed history", e);
      // 뒤로가기를 눌렀을때, 각 탭에 맞는 page가 아니라면 변경해준다.
      // /takers 경로라면 유지
      // /takers/strategy-search 경로라면 tab=0 으로
      if (e.pathname.startsWith("/takers/strategy-search")) setPage(1);
      // /takers/mock-invest 경로라면 tab=1 으로
      if (e.pathname.startsWith("/takers/mock-invest")) setPage(2);
    });
    return unlisten;
  }, [history]);

  return (
    <nav>
      <Tabs
        swipeable={false}
        animated={true}
        tabs={tabs}
        onChange={(tab, index) => {
          // console.log("onChange", index, tab);
          // 탭스크롤 -> tabPage를 변경
          // 탭스크롤 현재의 history는 takers(mainpage)로 변경한다.
          setPage(index);
          history.push("/takers");
        }}
        page={page}
      >
        <section>
          <TickerSearch />
        </section>
        <section>
          <StrategySearch />
        </section>
        <section>
          <MockInvest />
        </section>
      </Tabs>
      <WhiteSpace />
    </nav>
  );
};

const NavBarContainer = () => {
  const history = useHistory();
  const { me } = useMember();

  return (
    <NavBar
      mode="dark"
      icon={
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push("/takers");
          }}
        >
          알고
          <br />
          리당
        </div>
      }
      onLeftClick={() => {
        console.log("onLeftClick");
      }}
      rightContent={[
        <div key="name">{!me.isLoading && me?.data?.data?.email_id}</div>,
        <Icon
          key="1"
          type="ellipsis"
          onClick={() => {
            console.log("ellipsis click");
          }}
        />,
      ]}
    ></NavBar>
  );
};
export const URLList = {
  tickerSearch: {
    url: "/takers/ticker-search",
  },
  strategySearch: {
    url: "/takers/strategy-search",
  },
  mockInvest: {
    url: "/takers/mock-invest",
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

const SBottomNavigation = styled.section`
  position: fixed;
  bottom: 0rem;
  width: 100%;
  height: 7.8rem;
  background-color: ${(props) => props.theme.ColorMainDarkGray};
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  z-index: 10;
  .navList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
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
    <>
      <section>
        <TickerSearch />
      </section>
      <section>
        <StrategySearch />
      </section>
      <section>
        <MockInvest />
      </section>
    </>
  );
};
const TakerConfig = () => {
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
    <section>
      <TakerConfig />
      <NavBarContainer />
      {/* <TabNavigationContainer /> */}
      <TakerMainSection />
      <BottomNavigation />
    </section>
  );
};

export default TakerMainContainer;
export { TakerMainContainer as TakersHome };
