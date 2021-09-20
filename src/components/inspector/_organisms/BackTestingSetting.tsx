import WingBlank from 'components/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import produce from 'immer';
import MockInvestReport from 'pages/takers/mock-invest/section/mock-invest-report';
import StrategyDetails from 'pages/takers/strategy-search/section/strategy-details';
import React, { useEffect, useMemo } from 'react';
import { Route, useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { atomInspector } from 'states/recoil/strategy-create';
import styled from 'styled-components';
import { IInspectorSettings } from '.';

const PortBacktestTabStart = () => {
  return (
    <div>
      <div> PortBacktestTabStart </div>
    </div>
  );
};
const PortBacktestTabDetail = () => {
  const history = useHistory();
  useEffect(() => {
    history.push(
      process.env.PUBLIC_URL + '/makers/strategy-create/details/2672',
    );
    return () => {};
  }, [history]);

  return (
    <div>
      <div>PortBacktestTabDetail</div>
      <Route
        path={process.env.PUBLIC_URL + '/makers/strategy-create/details/:id'}
        component={StrategyDetails}
      />
    </div>
  );
};
const PortBacktestTabReport = () => {
  const history = useHistory();
  useEffect(() => {
    history.push(
      process.env.PUBLIC_URL + '/makers/strategy-create/report/2672',
    );
    return () => {};
  }, [history]);

  return (
    <div>
      <div>PortBacktestTabReport</div>
      <Route
        path={process.env.PUBLIC_URL + '/makers/strategy-create/report/:id'}
        component={MockInvestReport}
      />
    </div>
  );
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
