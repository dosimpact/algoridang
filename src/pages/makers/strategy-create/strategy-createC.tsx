import React from "react";
import { SegmentedControl, WingBlank, WhiteSpace } from "antd-mobile";
import styled from "styled-components";

import ScreateBasic from "./section/screate-basic";
import ScreatePropterties from "./section/screate-propterties";
import ScreateTickers from "./section/screate-tickers";

// array을 value로 사용하면서도, 리터럴 타입으로도 가지고 싶다.
// ⚠ https://steveholgado.com/typescript-types-from-arrays/
// type SegmentedControlTab = typeof (SegmentedControlValues as const)[number];

const StrategyCreateC = () => {
  const SegmentedControlValues = ["기본설정", "종목발굴", "매매전략"];
  const [tab, setTab] = React.useState<string>(SegmentedControlValues[0]);

  return (
    <SStrategyCreateC>
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <SegmentedControl
          tintColor={"#F39C12"}
          style={{
            height: "7rem",
            width: "100%",
            fontSize: "4rem",
            cursor: "pointer",
          }}
          values={SegmentedControlValues}
          selectedIndex={SegmentedControlValues.indexOf(tab)}
          onChange={(e) => {}}
          onValueChange={(e) => {
            setTab(e);
          }}
        />
        <WhiteSpace size="lg" />
        {tab === SegmentedControlValues[0] && <ScreateBasic />}
        {tab === SegmentedControlValues[1] && <ScreatePropterties />}
        {tab === SegmentedControlValues[2] && <ScreateTickers />}
      </WingBlank>
    </SStrategyCreateC>
  );
};

const SStrategyCreateC = styled.section`
  .am-segment-item {
    font-size: 2.1rem;
  }
`;

export default StrategyCreateC;
export { StrategyCreateC as StrategyCreate };
