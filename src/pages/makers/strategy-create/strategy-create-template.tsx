import React from "react";
import { SegmentedControl } from "antd-mobile";
import styled from "styled-components";

import ScreateBasic from "./section/screate-basic";
import ScreatePropterties from "./section/screate-propterties";
import ScreateTickers from "./section/screate-tickers";
import WhiteSpace from "components/_atoms/WhiteSpace";
import WingBlank from "components/_atoms/WingBlank";
import BasicSettings from "components/_organisms/inspector/BasicSettings";
import { useRecoilValue } from "recoil";
import { selectorInspector } from "states/recoil/strategy-create";
// import { useRecoilState } from "recoil";
// import { atomStrategyState } from "states/recoil/strategy";

// array을 value로 사용하면서도, 리터럴 타입으로도 가지고 싶다.
// ⚠ https://steveholgado.com/typescript-types-from-arrays/
// type SegmentedControlTab = typeof (SegmentedControlValues as const)[number];

// 전략 생성 모듈
// DashBoard - Inspector
interface IStrategyCreateModule {
  currentInspector: JSX.Element;
}
const StrategyCreateModule: React.FC<IStrategyCreateModule> = ({
  currentInspector,
}) => {
  const SegmentedControlValues = ["기본설정", "종목발굴", "매매전략"];
  const [tab, setTab] = React.useState<string>(SegmentedControlValues[0]);
  // const [strategyState] = useRecoilState(atomStrategyState);

  return (
    <SStrategyCreateModule>
      <div className="wrapper">
        <div className="dashBoard"></div>
        <div className="inspector">{currentInspector}</div>
        {/* <WingBlank>
          <WhiteSpace />
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
          <WhiteSpace />
          {tab === SegmentedControlValues[0] && <ScreateBasic />}
          {tab === SegmentedControlValues[1] && <ScreateTickers />}
          {tab === SegmentedControlValues[2] && <ScreatePropterties />}
        </WingBlank> */}
      </div>
    </SStrategyCreateModule>
  );
};

const SStrategyCreateModule = styled.section`
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 40rem;
    height: 100vh;
  }

  .dashBoard {
    background-color: black;
  }
  .inspector {
    background-color: aliceblue;
  }
`;

/**
 * 전략 생성 템플릿
 * 전역 상태에 따라서 원하는 컴포넌트를 , 전략생성모듈에 장착시킨다.
 * @param {} datas
 * @returns {React.FC}
 */
const StrategyCreateTemplate = () => {
  const CurrentInspector = useRecoilValue(selectorInspector);

  return <StrategyCreateModule currentInspector={<CurrentInspector />} />;
};

export default StrategyCreateTemplate;
export { StrategyCreateTemplate as StrategyCreate };
