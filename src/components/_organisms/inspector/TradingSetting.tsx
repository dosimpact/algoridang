import WingBlank from 'components/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/_molecules/inspector/InspectorHeaderDetail';
import produce from 'immer';
import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { atomInspector } from 'states/recoil/strategy-create';
import styled from 'styled-components';
import { IInspectorSettings } from '.';

interface ITradingSetting extends IInspectorSettings {}

const TradingSettingTabTickerSearch = () => {
  return <div>Tab1</div>;
};

const TradingSettingTabQuantSearch = () => {
  return <div>Tab2</div>;
};

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
            종목 검색
          </div>
          <div onClick={() => handleTabIdx(1)} className="tabItem">
            퀀트 발굴
          </div>
        </article>
        {tab === 0 && (
          <>
            <TradingSettingTabTickerSearch />
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
