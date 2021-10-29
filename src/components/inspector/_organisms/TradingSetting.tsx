import WingBlank from 'components/common/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import produce from 'immer';
import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IInspectorSettings } from '.';
import WideLine from 'components/common/_atoms/WideLine';
import { atomInspector } from 'states/common/recoil/dashBoard/inspector';
import TradingSettingTabTechnicalSearch from './TradingSettingTabTechnicalSearch';
import TradingSettingTabQuantSearch from './TradingSettingTabQuantSearch';

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
      <InspectorHeaderDetail
        headerTitle={headerTitle || '매매 전략 설정'}
        toolTip="사고 파는 방법을 설정합니다. 전략발굴탭에서 높은 수익률을 확인해 보세요"
      />
      <WingBlank>
        <WideLine style={{ margin: '0 0 1.3rem 0' }} />
        <article className="tabContainer">
          <StabItem selected={tab === 0} onClick={() => handleTabIdx(0)}>
            전략 검색
          </StabItem>
          <StabItem selected={tab === 1} onClick={() => handleTabIdx(1)}>
            전략 발굴
          </StabItem>
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
    grid-template-columns: repeat(2, 1fr);
    cursor: pointer;
    & div:first-child {
      border-top-left-radius: 0.6rem;
      border-bottom-left-radius: 0.6rem;
    }
    & div:last-child {
      border-top-right-radius: 0.6rem;
      border-bottom-right-radius: 0.6rem;
    }
  }
`;

const StabItem = styled.div<{ selected?: boolean }>`
  min-height: 6rem;
  background-color: ${(props) =>
    props.selected ? props.theme.ColorMainYellow : props.theme.ColorWhite};
  color: ${(props) =>
    props.selected ? props.theme.ColorWhite : props.theme.ColorDark};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
`;
