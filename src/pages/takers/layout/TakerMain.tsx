import React from "react";
import { NavBar, Icon, Tabs, WhiteSpace, Badge } from "antd-mobile";
import MockInvest from "../mock-invest/mock-investC";
import StrategySearch from "../strategy-search/strategy-searchC";
import { useHistory, useLocation } from "react-router-dom";

const tabs = [
  { title: <Badge dot>전략 탐색</Badge> },
  { title: <Badge text={"1"}>모의 투자</Badge> },
  { title: "나의 정보" },
];

const TabNavigation = () => {
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    const checkInitLocation = () => {
      console.log("checkInitLocation", location);

      if (location.pathname.startsWith("/takers/strategy-search")) setPage(0);
      // /takers/mock-invest 경로라면 tab=1 으로
      if (location.pathname.startsWith("/takers/mock-invest")) setPage(1);
    };
    console.log("checkInitLocation", location);
    checkInitLocation();
    return () => {};
  }, [location]);

  React.useEffect(() => {
    const unlisten = history.listen((e) => {
      console.log("changed history", e);
      // 뒤로가기를 눌렀을때, 각 탭에 맞는 page가 아니라면 변경해준다.
      // /takers 경로라면 유지
      // /takers/strategy-search 경로라면 tab=0 으로
      if (e.pathname.startsWith("/takers/strategy-search")) setPage(0);
      // /takers/mock-invest 경로라면 tab=1 으로
      if (e.pathname.startsWith("/takers/mock-invest")) setPage(1);
    });
    return unlisten;
  }, [history]);
  return (
    <nav>
      <Tabs
        // animated={false}
        tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => {
          // 탭이 바뀌면 현재의 history는 takers(mainpage)로 변경한다.
          // console.log("onChange", index, tab);
          history.push("/takers/");
        }}
        page={page}
        onTabClick={(tab, index) => {
          // 탭이 클릭되면, tabPage를 변경한다.
          // console.log("onTabClick", index, tab);
          setPage(index);
        }}
      >
        <section>
          <StrategySearch />
        </section>
        <section>
          <MockInvest />
        </section>
        <section>⚠ 나의 정보...</section>
      </Tabs>
      <WhiteSpace />
    </nav>
  );
};

const NavBarComponent = () => {
  const history = useHistory();

  return (
    <NavBar
      mode="dark"
      icon={
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push("/takers/");
          }}
        >
          알고리당 🥞
        </div>
      }
      onLeftClick={() => {
        console.log("onLeftClick");
      }}
      rightContent={[
        <div>hello님</div>,
        <Icon
          key="0"
          type="search"
          style={{ marginRight: "16px" }}
          onClick={() => {
            console.log("search click");
          }}
        />,
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

const TakerMain = () => {
  return (
    <section>
      <NavBarComponent />
      <TabNavigation />
    </section>
  );
};

export default TakerMain;
export { TakerMain as TakersHome };
