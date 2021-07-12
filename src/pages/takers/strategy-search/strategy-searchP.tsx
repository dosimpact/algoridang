import { WingBlank, WhiteSpace } from "antd-mobile";
import StrategyCard from "components/strategy/strategy-card";
import React from "react";
import { toTagsString } from "utils/parse";
import StrategyFeeds from "./section/strategy-feeds";

const StrategySearchP = () => {
  return (
    <WingBlank style={{ margin: "15x" }} size="lg">
      <StrategyFeeds />
    </WingBlank>
  );
};

export default StrategySearchP;
