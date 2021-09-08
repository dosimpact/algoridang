import React from "react";
import { SegmentedControl } from "antd-mobile";
import styled from "styled-components";

import ScreateBasic from "./section/screate-basic";
import ScreatePropterties from "./section/screate-propterties";
import ScreateTickers from "./section/screate-tickers";
import WhiteSpace from "components/_atoms/WhiteSpace";
import WingBlank from "components/_atoms/WingBlank";
import BasicSettings from "components/_organisms/inspector/BaseSettings";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  atomInspector,
  IInspectorTypes,
  selectorInspector,
} from "states/recoil/strategy-create";
import DashBoardButton from "components/_molecules/DashBoardButton";
import { IconPlus, IconSetting } from "assets/icons";

// 전략 생성 모듈
// DashBoard - Inspector
interface IStrategyCreateModule {
  // 현재 인스팩터 앨리먼트
  currentInspectorElement: JSX.Element;
  // 전략 셋팅 버튼 앨리먼트
  baseSettingBtnElement: JSX.Element;
  // 종목 셋팅 버튼 앨리먼트
  universalSettingBtnElement: JSX.Element;
  // 종목 리스트 표시 앨리먼트

  // 단일 종목 설정 앨리먼트
  // 단일 종목 매매 결과 앨리먼트
  // 다종 종목 백테스팅 결과 앨리먼트
}
const StrategyCreateModule: React.FC<IStrategyCreateModule> = ({
  currentInspectorElement,
  baseSettingBtnElement,
  universalSettingBtnElement,
}) => {
  const SegmentedControlValues = ["기본설정", "종목발굴", "매매전략"];
  const [tab, setTab] = React.useState<string>(SegmentedControlValues[0]);
  // const [strategyState] = useRecoilState(atomStrategyState);

  return (
    <SStrategyCreateModule>
      <div className="wrapper">
        <article className="dashBoard">
          <section className="dashBoardCol1">
            <div className="slot">{baseSettingBtnElement}</div>
            <div className="slot">{universalSettingBtnElement}</div>
          </section>
          <section className="dashBoardCol2">
            <ul>
              <div className="slot">종목1 매매전략 설정</div>
              <div className="slot">종목2 매매전략 설정</div>
            </ul>
          </section>
          <section className="dashBoardCol3">
            <ul>
              <div className="slot">종목1 매매전략 결과</div>
              <div className="slot">종목2 매매전략 결과</div>
            </ul>
          </section>
          <section className="dashBoardCol4">
            <div className="slot">포트 백테스팅 결과</div>
          </section>
        </article>
        <article className="inspector">{currentInspectorElement}</article>
      </div>
    </SStrategyCreateModule>
  );
};

const SStrategyCreateModule = styled.section`
  min-height: 100vh;
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 40rem;
    min-height: 100vh;
  }

  .dashBoard {
    background-color: aliceblue;
    min-height: 80vh;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    .dashBoardCol1 {
      background-color: rgb(255, 238, 219);
      min-height: 80vh;
    }
    .dashBoardCol2 {
      background-color: rgb(255, 219, 227);
      min-height: 80vh;
    }
    .dashBoardCol3 {
      background-color: rgb(227, 255, 219);
      min-height: 80vh;
    }
    .dashBoardCol4 {
      background-color: rgb(219, 236, 255);
      min-height: 80vh;
    }
  }
  .inspector {
    background-color: azure;
  }
`;

/**
 * 전략 생성 템플릿
 * 전역 상태에 따라서 원하는 컴포넌트를 , 전략생성모듈에 장착시킨다.
 * @param {} datas
 * @returns {React.FC}
 */
const StrategyCreateTemplate = () => {
  const [insepctorState, setInsepctorState] = useRecoilState(atomInspector);
  const CurrentInspector = useRecoilValue(selectorInspector);

  const handleChangeInspector = (type: IInspectorTypes) => {
    setInsepctorState((prev) => ({
      ...prev,
      inspectorType: type,
    }));
  };

  return (
    <StrategyCreateModule
      currentInspectorElement={<CurrentInspector />}
      baseSettingBtnElement={
        <DashBoardButton
          Icon={IconSetting}
          text="기본 설정"
          onClick={() => {
            handleChangeInspector("basicSetting");
          }}
        />
      }
      universalSettingBtnElement={
        <DashBoardButton
          Icon={IconPlus}
          text="종목 관리"
          onClick={() => {
            handleChangeInspector("universalSetting");
          }}
        />
      }
    />
  );
};

export default StrategyCreateTemplate;
export { StrategyCreateTemplate as StrategyCreate };
