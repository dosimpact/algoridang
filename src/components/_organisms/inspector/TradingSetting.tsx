import WingBlank from 'components/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/_molecules/inspector/InspectorHeaderDetail';
import produce from 'immer';
import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import {
  atomInspector,
  selectedUniversalSetting,
} from 'states/recoil/strategy-create';
import styled from 'styled-components';
import { IInspectorSettings } from '.';
import TechnicalSearch from 'components/_atoms/TechnicalSearch';
import { useTechnicals } from 'states/react-query/trading/useTechnicals';
import { BaseTradingStrategy } from 'states/interface/trading/entities';

interface ITechnicalStrategyList {
  onSelect?: (e: BaseTradingStrategy) => void;
}
// - 매매 전략 리스트 랜더링
// -- 매매 전략 클릭시 해당 객체 onSelect(callback)
const TechnicalStrategyList: React.FC<ITechnicalStrategyList> = ({
  onSelect,
}) => {
  const { GetTechnicalStrategyListQuery } = useTechnicals();

  return (
    <div>
      {GetTechnicalStrategyListQuery.isLoading && 'loading...'}
      {!GetTechnicalStrategyListQuery.isLoading && (
        <ul>
          {GetTechnicalStrategyListQuery.data?.map((st, idx) => (
            <li
              style={{
                cursor: 'pointer',
                backgroundColor: 'ActiveCaption',
                margin: '1rem',
              }}
              key={`${idx}-${st.trading_strategy_name}`}
              onClick={() => {
                if (onSelect) onSelect(st);
              }}
            >
              {st.trading_strategy_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/**
 * -매매전략 검색
 * -매매 전략 리스트
 * -개별 종목에 매매 전략 적용
 */
const TradingSettingTabTechnicalSearch = () => {
  const [inspector, setInspector] = useRecoilState(atomInspector);
  const [currentUniversalSetting, setCurrentUniversalSetting] = useRecoilState(
    selectedUniversalSetting,
  );

  // 셋팅 대상이 되는 ticker index

  // 선택한 전략을 해당 유니버스에 적용시킨다.
  const handleApplyTechinalToTicker = (e: BaseTradingStrategy) => {
    if (currentUniversalSetting)
      setCurrentUniversalSetting({
        ...currentUniversalSetting,
        selectedTechnical: e,
      });
  };

  return (
    <div>
      <div>
        선택된 종목 : {currentUniversalSetting?.selectedCorporations.corp_name}
      </div>
      <div> --- </div>
      <div>
        선택된 매매 전략 :
        {currentUniversalSetting?.selectedTechnical?.trading_strategy_name}
      </div>
      <TechnicalSearch />
      <TechnicalStrategyList onSelect={(e) => handleApplyTechinalToTicker(e)} />
    </div>
  );
};

const TradingSettingTabQuantSearch = () => {
  return <div>Tab2</div>;
};

interface ITradingSetting extends IInspectorSettings {}

const TradingSetting: React.FC<ITradingSetting> = ({ headerTitle }) => {
  const [inspector, setInspector] = useRecoilState(atomInspector);

  const tab = useMemo(
    () => inspector.inspectorState.tradingSetting.tab,
    [inspector.inspectorState.tradingSetting],
  );
  const handleTabIdx = (tabIdx: number) => {
    setInspector((prev) =>
      produce(prev, (draft) => {
        draft.inspectorState.tradingSetting.tab = tabIdx;
        return draft;
      }),
    );
  };

  return (
    <STradingSetting>
      <WingBlank>
        <InspectorHeaderDetail headerTitle={headerTitle || 'TradingSetting'} />
        <article className="tabContainer">
          <div onClick={() => handleTabIdx(0)} className="tabItem">
            전략 검색
          </div>
          <div onClick={() => handleTabIdx(1)} className="tabItem">
            전략 발굴
          </div>
        </article>
        {tab === 0 && (
          <>
            <TradingSettingTabTechnicalSearch />
          </>
        )}
        {tab === 1 && (
          <>
            <TradingSettingTabQuantSearch />
          </>
        )}
      </WingBlank>
    </STradingSetting>
  );
};

export default TradingSetting;

const STradingSetting = styled.section`
  .tabContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    cursor: pointer;
    .tabItem {
      min-height: 4rem;
      background-color: bisque;
      text-align: center;
    }
  }
`;
