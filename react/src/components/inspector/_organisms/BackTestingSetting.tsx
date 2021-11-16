import WideLine from 'components/common/_atoms/WideLine';
import WingBlank from 'components/common/_atoms/WingBlank';
import produce from 'immer';
import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  atomInspector,
  selector_ST3_isComplete,
} from 'states/common/recoil/dashBoard/inspector';
import styled from 'styled-components';
import InspectorSettings, { IInspectorSettings } from '.';
import BackTestingSettingTabResult from './BackTestingSettingTabResult';
import BackTestingSettingTabStart from './BackTestingSettingTabStart';

interface IBackTestingSetting extends IInspectorSettings {}
/**
 * 백테스팅 인스펙터
 * @returns
 */
const BackTestingSetting: React.FC<IBackTestingSetting> = ({ headerTitle }) => {
  const [inspector, setInspector] = useRecoilState(atomInspector);

  const tab = useMemo(
    () => inspector.inspectorState.backTestingSetting.tab,
    [inspector.inspectorState.backTestingSetting],
  );

  const handleTabIdx = (tabIdx: number) => {
    setInspector((prev) =>
      produce(prev, (draft) => {
        draft.inspectorState.backTestingSetting.tab = tabIdx;
        return draft;
      }),
    );
  };
  const ST3_isComplete = useRecoilValue(selector_ST3_isComplete);
  return (
    <SBackTestingSetting>
      <InspectorSettings
        toolTip="만들어진 전략으로 과거부터 테스트 해봅니다."
        headerTitle={headerTitle || '백테스팅'}
        isComplete={ST3_isComplete}
      >
        <WingBlank>
          <WideLine style={{ margin: '0 0 1.3rem 0' }} />
          <article className="tabContainer">
            <StabItem selected={tab === 0} onClick={() => handleTabIdx(0)}>
              백테스팅
            </StabItem>
            <StabItem selected={tab === 1} onClick={() => handleTabIdx(1)}>
              상세결과
            </StabItem>
          </article>
        </WingBlank>
        {tab === 0 && (
          <>
            <BackTestingSettingTabStart />
          </>
        )}
        {tab === 1 && (
          <>
            <BackTestingSettingTabResult />
          </>
        )}
      </InspectorSettings>
    </SBackTestingSetting>
  );
};

export default BackTestingSetting;

const SBackTestingSetting = styled.section`
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
