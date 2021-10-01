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
} from 'states/strategy/recoil/strategy-create';
import DashBoardButton from 'components/common/_molecules/DashBoardButton';
import { IconPlusNormal, IconSettingNormal, IconInfo } from 'assets/icons';
import DashBoardDebug from 'components/common/_molecules/DashBoardDebug';
import TickerPrice from 'components/common/_organisms/ticker-price';
import WingBlank from 'components/common/_atoms/WingBlank';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';

// 전략 생성 모듈
// DashBoard - Inspector
// TODO : JSX.Element  vs React.ReactElement
// JSX.Element 의 제너릭 타입이 React.ReactElement 이다.
interface IStrategyCreateModule {
  // 현재 인스팩터 앨리먼트
  currentInspectorElement: React.ReactElement | null; //JSX.Element;
  dashBoardCol1: {
    // 전략 셋팅, 종목 셋팅, 백테스트 셋팅
    baseSettingBtnElements: JSX.Element[];
    // 선택된 종목 리스트 표시 앨리먼트
    // selectedTickerElementList: JSX.Element[];
  };
  // 단일 종목 설정 앨리먼트
  selectedMonoTickerSettingButtonList: JSX.Element[];
  // 단일 종목 매매 결과 앨리먼트
  // dashBoardCol3?: JSX.Element[];
  // // 포트 백테스팅 결과 앨리먼트
  // dashBoardCol4: {
  //   // 포트 백테스트 버튼 앨리먼트
  //   portBacktestBtnElement: JSX.Element;
  // };
}
const StrategyCreateModule: React.FC<IStrategyCreateModule> = ({
  currentInspectorElement,
  dashBoardCol1,
  selectedMonoTickerSettingButtonList,
  // dashBoardCol3,
  // dashBoardCol4,
}) => {
  const { baseSettingBtnElements } = dashBoardCol1;

  // const { portBacktestBtnElement } = dashBoardCol4;

  // const SegmentedControlValues = ['기본설정', '종목발굴', '매매전략'];
  // const [tab, setTab] = React.useState<string>(SegmentedControlValues[0]);
  // const [strategyState] = useRecoilState(atomStrategyState);

  return (
    <SStrategyCreateModule>
      <article className="columns">
        <section className="dashBoardCol1">
          <WingBlank>
            <div className="baseSettingBtnSlot">
              {baseSettingBtnElements}
              {<DashBoardDebug />}
            </div>
          </WingBlank>
          <div className="charSlot">
            <TickerPrice />
          </div>
          {/* <div className="slot">{baseSettingBtnElement}</div> */}
          {/* <div className="slot">{universalSettingBtnElement}</div> */}
          {/* <div className="slot">{selectedTickerElementList}</div> */}
        </section>
        <section className="dashBoardCol2">
          <WhiteSpace />
          <div className="interestTickersHeader">
            관심 종목 리스트
            <span className="iconInfo">
              <IconInfo />
            </span>
          </div>
          <WhiteSpace />
          <article className="interestTickers">
            <ul className="slot">{selectedMonoTickerSettingButtonList}</ul>
          </article>
        </section>
        <section className="inspector">
          {currentInspectorElement && currentInspectorElement}
        </section>
      </article>
    </SStrategyCreateModule>
  );
};

const SStrategyCreateModule = styled.section`
  min-height: 100vh;

  .interestTickersHeader {
    text-align: start;
    display: flex;
    align-items: center;
    .iconInfo {
      margin-left: 1rem;
      svg {
        fill: ${(props) => props.theme.ColorMainGray};
        width: 2rem;
      }
    }
  }

  .columns {
    background-color: white;
    min-height: 80vh;
    padding: 2rem;
    display: grid;
    grid-template-columns: 80rem minmax(35rem, 1fr) 38rem;
    grid-gap: 2rem;
    .dashBoardCol1 {
      min-height: 80vh;
    }
  }
  .inspector {
    background-color: ${(props) => props.theme.ColorGrayL2};
  }
  .interestTickers {
    /* border: 1px solid red; */
    height: 95vh;
    overflow-y: scroll;
  }
  .baseSettingBtnSlot {
    display: flex;
    flex-flow: row nowrap;
    & > div {
      margin-right: 1rem;
    }
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
  // const selectedTickerElementList = useRecoilValue(
  //   selectedTickerElementListJSX,
  // );

  // Selector : 선택된 단일 종목 매매전략 셋팅 버튼 , JSX 리스트 리턴
  const selectedMonoTickerSettingButtonList = useRecoilValue(
    selectedMonoTickerSettingButtonListJSX,
  );

  // Selector : 선택된 단일 종목 매매전략 셋팅 버튼 , JSX 리스트 리턴
  // const selecteMiniBacktestResultList = useRecoilValue(
  //   selecteMiniBacktestResultListJSX,
  // );

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
        baseSettingBtnElements: [
          <DashBoardButton
            Icon={IconSettingNormal}
            text="기본설정"
            onClick={() => {
              handleChangeInspector('basicSetting');
            }}
          />,
          <DashBoardButton
            Icon={IconPlusNormal}
            text="종목관리"
            onClick={() => {
              handleChangeInspector('universalSetting');
            }}
          />,
          <DashBoardButton
            Icon={IconPlusNormal}
            text="백테스트"
            onClick={() => {
              handleChangeInspector('backTestingSetting');
            }}
          />,
        ],
        // selectedTickerElementList: selectedTickerElementList,
      }}
      selectedMonoTickerSettingButtonList={selectedMonoTickerSettingButtonList}
      // dashBoardCol3={selecteMiniBacktestResultList}
      // dashBoardCol4={{
      //   portBacktestBtnElement: (
      //     <DashBoardButton
      //       Icon={IconTesting}
      //       text="포트 백테스트"
      //       onClick={() => {
      //         handleChangeInspector('backTestingSetting');
      //       }}
      //     />
      //   ),
      // }}
    />
  );
};

export default StrategyCreateTemplate;
export { StrategyCreateTemplate as StrategyCreate };
