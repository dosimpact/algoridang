import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import DashBoardButton from 'components/common/_molecules/DashBoardButton';
import { IconPlusNormal, IconSettingNormal, IconInfo } from 'assets/icons';
import DashBoardDebug from 'components/common/_molecules/DashBoardDebug';
import TickerPrice from 'components/common/_organisms/ticker-price';
import WingBlank from 'components/common/_atoms/WingBlank';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import ReactTooltip from 'react-tooltip';
import {
  selectorInspectorFC,
  selectorInspectorType,
  selector_ST1_isComplete,
  selector_ST2_isComplete,
  selector_ST3_isComplete,
} from 'states/common/recoil/dashBoard/inspector';
import {
  selectedMonoTickerSettingButtonListJSX,
  selectorCurrentCorpLen,
} from 'states/common/recoil/dashBoard/dashBoard';
import { ShadowBox } from 'components/common/_atoms/ShadowBox';

// 전략 생성 모듈
// DashBoard - Inspector
// TODO : JSX.Element  vs React.ReactElement
// JSX.Element 의 제너릭 타입이 React.ReactElement 이다.
interface IStrategyCreateModule {
  currentCorpLen: number;
  // 현재 인스팩터 앨리먼트
  currentInspectorElement: React.ReactElement | null; //JSX.Element;
  dashBoardCol1: {
    // 전략 셋팅, 종목 셋팅, 백테스트 셋팅
    baseSettingBtnElements: JSX.Element[];
  };
  // 단일 종목 설정 앨리먼트
  selectedMonoTickerSettingButtonList: JSX.Element[];
}
const StrategyCreateModule: React.FC<IStrategyCreateModule> = ({
  currentCorpLen,
  currentInspectorElement,
  dashBoardCol1,
  selectedMonoTickerSettingButtonList,
}) => {
  const { baseSettingBtnElements } = dashBoardCol1;

  return (
    <SStrategyCreateModule>
      <div className="dashBoard">
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
          </section>
          <section className="dashBoardCol2">
            <WhiteSpace />
            <div className="interestTickersHeader">
              관심 종목 리스트 ({currentCorpLen}개)
              <span
                data-tip="interestTickerInfo"
                data-for="interestTickerInfo"
                className="iconInfo"
              >
                <IconInfo />
              </span>
            </div>
            <ReactTooltip id="interestTickerInfo">
              전략에 포함되는 종목들 입니다.
            </ReactTooltip>
            <WhiteSpace />
            <ShadowBox>
              <article className="interestTickers">
                <ul className="slot">{selectedMonoTickerSettingButtonList}</ul>
              </article>
            </ShadowBox>
          </section>
        </article>
        <section className="inspector">
          {currentInspectorElement && currentInspectorElement}
        </section>
      </div>
    </SStrategyCreateModule>
  );
};

const SStrategyCreateModule = styled.section`
  min-height: 100vh;

  .dashBoard {
    display: grid;
    grid-template-columns: 1fr 38rem;
    min-height: 100vh;
  }
  .interestTickersHeader {
    text-align: start;
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 2rem;
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
    min-height: 76vh;
    padding: 2rem 2rem 0rem 2rem;
    display: grid;
    grid-template-columns: 80rem minmax(35rem, 1fr);
    grid-gap: 2rem;
    .dashBoardCol1 {
      min-height: 80vh;
    }
  }
  .inspector {
    background-color: ${(props) => props.theme.ColorGrayL2};
    min-height: 100vh;
  }
  .interestTickers {
    /* border: 1px solid red; */
    height: 80vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 0.2rem;
    }
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
  // const [, setInsepctorState] = useRecoilState(atomInspector);
  // Selector: 현재 인스팩터 - React.FC 반환
  const CurrentInspector = useRecoilValue(selectorInspectorFC);

  // Selector : 선택된 단일 종목 매매전략 셋팅 버튼 , JSX 리스트 리턴
  const selectedMonoTickerSettingButtonList = useRecoilValue(
    selectedMonoTickerSettingButtonListJSX,
  );

  const [, handleChangeInspector] = useRecoilState(selectorInspectorType);
  const ST1_isComplete = useRecoilValue(selector_ST1_isComplete);
  const ST2_isComplete = useRecoilValue(selector_ST2_isComplete);
  const ST3_isComplete = useRecoilValue(selector_ST3_isComplete);

  const currentCorpLen = useRecoilValue(selectorCurrentCorpLen);

  return (
    <StrategyCreateModule
      currentCorpLen={currentCorpLen}
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
            isComplete={ST1_isComplete}
          />,
          <DashBoardButton
            Icon={IconPlusNormal}
            text="종목관리"
            onClick={() => {
              handleChangeInspector('universalSetting');
            }}
            isComplete={ST2_isComplete}
          />,
          <DashBoardButton
            Icon={IconPlusNormal}
            text="백테스트"
            onClick={() => {
              handleChangeInspector('backTestingSetting');
            }}
            isComplete={ST3_isComplete}
          />,
        ],
      }}
      selectedMonoTickerSettingButtonList={selectedMonoTickerSettingButtonList}
    />
  );
};

export default StrategyCreateTemplate;
export { StrategyCreateTemplate as StrategyCreate };
