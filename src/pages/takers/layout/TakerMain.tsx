import React from "react";
import { NavBar, Icon, Tabs, WhiteSpace, Badge } from "antd-mobile";
import MockInvest from "../mock-invest/mock-investC";
import StrategySearch from "../strategy-search/strategy-searchC";

const tabs = [
  { title: <Badge dot>전략 탐색</Badge> },
  { title: <Badge text={"1"}>모의 투자</Badge> },
  { title: "나의 정보" },
];

const TabNavigation = () => (
  <nav>
    <Tabs
      tabs={tabs}
      initialPage={0}
      onChange={(tab, index) => {
        console.log("onChange", index, tab);
      }}
      onTabClick={(tab, index) => {
        console.log("onTabClick", index, tab);
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

const NavBarComponent = () => {
  return (
    <NavBar
      mode="dark"
      icon={<div>알고리당🥞 - hello님</div>}
      onLeftClick={() => {
        console.log("onLeftClick");
      }}
      rightContent={[
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
