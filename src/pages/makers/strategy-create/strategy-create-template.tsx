import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  atomInspector,
  IInspectorTypes,
  selectedMonoTickerSettingButtonListJSX,
  selectedTickerElementListJSX,
  selecteMiniBacktestResultListJSX,
  selectorInspectorFC,
} from 'states/recoil/strategy-create';
import DashBoardButton from 'components/_molecules/DashBoardButton';
import { IconPlus, IconSetting, IconTesting } from 'assets/icons';
import DashBoardDebug from 'components/_molecules/DashBoardDebug';

// 전략 생성 모듈
// DashBoard - Inspector
// TODO : JSX.Element  vs React.ReactElement
// JSX.Element 의 제너릭 타입이 React.ReactElement 이다.
interface IStrategyCreateModule {
  // 현재 인스팩터 앨리먼트
  currentInspectorElement: React.ReactElement | null; //JSX.Element;
  dashBoardCol1: {
    // 전략 셋팅 버튼 앨리먼트
    baseSettingBtnElement: JSX.Element;
    // 종목 셋팅 버튼 앨리먼트
    universalSettingBtnElement: JSX.Element;
    // 선택된 종목 리스트 표시 앨리먼트
    selectedTickerElementList: JSX.Element[];
  };
  // 단일 종목 설정 앨리먼트
  selectedMonoTickerSettingButtonList: JSX.Element[];
  // 단일 종목 매매 결과 앨리먼트
  dashBoardCol3?: JSX.Element[];
  // 포트 백테스팅 결과 앨리먼트
  dashBoardCol4: {
    // 포트 백테스트 버튼 앨리먼트
    portBacktestBtnElement: JSX.Element;
  };
}
const StrategyCreateModule: React.FC<IStrategyCreateModule> = ({
  currentInspectorElement,
  dashBoardCol1,
  selectedMonoTickerSettingButtonList,
  dashBoardCol3,
  dashBoardCol4,
}) => {
  const {
    baseSettingBtnElement,
    universalSettingBtnElement,
    selectedTickerElementList,
  } = dashBoardCol1;

  const { portBacktestBtnElement } = dashBoardCol4;

  const SegmentedControlValues = ['기본설정', '종목발굴', '매매전략'];
  const [tab, setTab] = React.useState<string>(SegmentedControlValues[0]);
  // const [strategyState] = useRecoilState(atomStrategyState);

  return (
    <SStrategyCreateModule>
      <div className="wrapper">
        <article className="dashBoard">
          <section className="dashBoardCol1">
            <DashBoardDebug />
            <div className="slot">{baseSettingBtnElement}</div>
            <div className="slot">{universalSettingBtnElement}</div>
            <div className="slot">{selectedTickerElementList}</div>
          </section>
          <section className="dashBoardCol2">
            <ul className="slot">{selectedMonoTickerSettingButtonList}</ul>
          </section>
          <section className="dashBoardCol3">
            <ul>{dashBoardCol3 && dashBoardCol3}</ul>
          </section>
          <section className="dashBoardCol4">
            <div className="slot">{portBacktestBtnElement}</div>
            <div className="slot">포트 백테스팅 결과</div>
          </section>
        </article>
        <article className="inspector">
          {currentInspectorElement && currentInspectorElement}
        </article>
      </div>
    </SStrategyCreateModule>
  );
};

const SStrategyCreateModule = styled.section`
  min-height: 100vh;
  .wrapper {
    display: grid;
    grid-template-columns: minmax(70rem, 1fr) 40rem;
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
  // State: 인스펙터 전체 상태
  const [insepctorState, setInsepctorState] = useRecoilState(atomInspector);
  // Selector: 현재 인스팩터 - React.FC 반환
  const CurrentInspector = useRecoilValue(selectorInspectorFC);

  // Selector: 현재 선택된 종목 - JSX.Element 리스트를 선택
  const selectedTickerElementList = useRecoilValue(
    selectedTickerElementListJSX,
  );

  // Selector : 선택된 단일 종목 매매전략 셋팅 버튼 , JSX 리스트 리턴
  const selectedMonoTickerSettingButtonList = useRecoilValue(
    selectedMonoTickerSettingButtonListJSX,
  );

  // Selector : 선택된 단일 종목 매매전략 셋팅 버튼 , JSX 리스트 리턴
  const selecteMiniBacktestResultList = useRecoilValue(
    selecteMiniBacktestResultListJSX,
  );

  // Handler
  const handleChangeInspector = (type: IInspectorTypes) => {
    setInsepctorState((prev) => ({
      ...prev,
      inspectorType: type,
    }));
  };

  return (
    <StrategyCreateModule
      currentInspectorElement={<CurrentInspector />}
      // currentInspectorElement={CurrentInspector({})}
      dashBoardCol1={{
        baseSettingBtnElement: (
          <DashBoardButton
            Icon={IconSetting}
            text="기본 설정"
            onClick={() => {
              handleChangeInspector('basicSetting');
            }}
          />
        ),
        universalSettingBtnElement: (
          <DashBoardButton
            Icon={IconPlus}
            text="종목 관리"
            onClick={() => {
              handleChangeInspector('universalSetting');
            }}
          />
        ),
        selectedTickerElementList: selectedTickerElementList,
      }}
      selectedMonoTickerSettingButtonList={selectedMonoTickerSettingButtonList}
      dashBoardCol3={selecteMiniBacktestResultList}
      dashBoardCol4={{
        portBacktestBtnElement: (
          <DashBoardButton
            Icon={IconTesting}
            text="포트 백테스트"
            onClick={() => {
              handleChangeInspector('backTestingSetting');
            }}
          />
        ),
      }}
    />
  );
};

export default StrategyCreateTemplate;
export { StrategyCreateTemplate as StrategyCreate };
