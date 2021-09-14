import WingBlank from 'components/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/_molecules/inspector/InspectorHeaderDetail';
import produce from 'immer';
import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { atomInspector } from 'states/recoil/strategy-create';
import styled from 'styled-components';
import { IInspectorSettings } from '.';

const PortBacktestTabStart = () => {
  return <div>PortBacktestTabStart</div>;
};
const PortBacktestTabDetail = () => {
  return <div>PortBacktestTabDetail</div>;
};
const PortBacktestTabReport = () => {
  return <div>PortBacktestTabReport</div>;
};

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

  return (
    <SBackTestingSetting>
      <WingBlank>
        <InspectorHeaderDetail
          headerTitle={headerTitle || 'BackTestingSetting'}
        />
        <article className="tabContainer">
          <div onClick={() => handleTabIdx(0)} className="tabItem">
            백테스팅
          </div>
          <div onClick={() => handleTabIdx(1)} className="tabItem">
            상세결과
          </div>
          <div onClick={() => handleTabIdx(2)} className="tabItem">
            리포트
          </div>
        </article>
        {tab === 0 && (
          <>
            <PortBacktestTabStart />
          </>
        )}
        {tab === 1 && (
          <>
            <PortBacktestTabDetail />
          </>
        )}
        {tab === 2 && (
          <>
            <PortBacktestTabReport />
          </>
        )}
      </WingBlank>
    </SBackTestingSetting>
  );
};

export default BackTestingSetting;

const SBackTestingSetting = styled.section`
  .tabContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    cursor: pointer;
    .tabItem {
      min-height: 4rem;
      background-color: bisque;
      text-align: center;
    }
  }
`;
