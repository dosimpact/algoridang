import React, { useMemo } from 'react';
import WingBlank from 'components/common/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IInspectorSettings } from '.';
import produce from 'immer';
import WideLine from 'components/common/_atoms/WideLine';
import { atomInspector } from 'states/common/recoil/dashBoard/inspector';
import UniversalSettingTabTickerSearch from './UniversalSettingTabTickerSearch';
import UniversalSettingTabQuantSearchVM from './UniversalSettingTabQuantSearchVM';

interface IUniversalSetting extends IInspectorSettings {}
/**
 * 인스팩터 - 종목관리(UniversalSetting)
 * @param {IUniversalSetting} IUniversalSetting
 * @returns {JSX.Element}
 */

const UniversalSetting: React.FC<IUniversalSetting> = ({ headerTitle }) => {
  // 1 인스펙터 상태
  const [inspector, setInspector] = useRecoilState(atomInspector);

  // 1.1 현재 인스팩터 상태
  const tab = useMemo(
    () => inspector.inspectorState.universalSetting.tab,
    [inspector.inspectorState.universalSetting],
  );

  const handleTabIdx = (tabIdx: number) => {
    setInspector((prev) =>
      produce(prev, (draft) => {
        draft.inspectorState.universalSetting.tab = tabIdx;
        return draft;
      }),
    );
  };

  return (
    <SUniversalSetting>
      <InspectorHeaderDetail headerTitle={headerTitle || '종목관리'} />
      <WingBlank>
        <WideLine style={{ margin: '0 0 1.3rem 0' }} />
        <article className="tabContainer">
          <StabItem selected={tab === 0} onClick={() => handleTabIdx(0)}>
            종목 검색
          </StabItem>
          <StabItem selected={tab === 1} onClick={() => handleTabIdx(1)}>
            퀀트 발굴
          </StabItem>
        </article>
        {tab === 0 && (
          <>
            <UniversalSettingTabTickerSearch />
          </>
        )}
        {tab === 1 && (
          <>
            <UniversalSettingTabQuantSearchVM />
          </>
        )}
      </WingBlank>
    </SUniversalSetting>
  );
};

export default UniversalSetting;

const SUniversalSetting = styled.section`
  .tabContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
