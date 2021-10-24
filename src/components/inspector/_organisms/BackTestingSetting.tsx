import { Button } from 'components/common/_atoms/Buttons';
import WideLine from 'components/common/_atoms/WideLine';
import WingBlank from 'components/common/_atoms/WingBlank';
import InspectorHeaderDetail from 'components/inspector/_molecules/InspectorHeaderDetail';
import produce from 'immer';
import MockInvestReport from 'pages/takers/mock-invest/section/mock-invest-report';
import StrategyDetails from 'pages/takers/strategy-search/section/strategy-details';
import React, { useEffect, useMemo } from 'react';
import { Route, useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import useBackTestMutation from 'states/backtest/query/useBackTestMutation';
import { atomCurrentStrategyCode } from 'states/common/recoil/dashBoard/dashBoard';
import {
  makeAddUniversals,
  makeCreateMyStrategy,
} from 'states/common/recoil/dashBoard/formState';
import { atomInspector } from 'states/common/recoil/dashBoard/inspector';
import useCreateStrategy from 'states/strategy/query/useCreateStrategy';
import styled from 'styled-components';
import { IInspectorSettings } from '.';

const PortBacktestTabStart = () => {
  const [currentStrategyCode, setCurrentStrategyCode] = useRecoilState(
    atomCurrentStrategyCode,
  );

  const makeCreateMyStrategyValue = useRecoilValue(makeCreateMyStrategy);
  const makeAddUniversalsValue = useRecoilValue(makeAddUniversals);
  const { addUniversalMutation, createMyStrategyMutation } =
    useCreateStrategy();
  const { pushBackTestQMutation } = useBackTestMutation();

  const handleCreateStrategy = async () => {
    try {
      const result = await createMyStrategyMutation.mutateAsync(
        makeCreateMyStrategyValue,
      );

      if (!result.data.memberStrategy?.strategy_code)
        throw new Error('전략 생성 실패');

      const strategy_code = result.data.memberStrategy?.strategy_code;
      toast.info('전략 생성 ...', {
        position: 'bottom-right',
      });
      setCurrentStrategyCode(strategy_code);

      await Promise.all(
        makeAddUniversalsValue.map(async (e) => {
          return addUniversalMutation.mutateAsync({
            strategy_code,
            body: {
              ...e,
              strategy_code,
            },
          });
        }),
      );
      toast.info('관심 종목 추가 ...', {
        position: 'bottom-right',
      });

      await pushBackTestQMutation.mutateAsync({ strategy_code });
      toast.info('백테스트 시작 ...', {
        position: 'bottom-right',
      });

      toast.success(
        `전략 생성 완료(${strategy_code}). 나의 전략에서 확인해보세요. ✨`,
        {
          position: 'bottom-right',
        },
      );
    } catch (error) {
      toast.warning(`${error.message}`, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <SPortBacktestTabStart>
      <WingBlank>
        <Button onClick={handleCreateStrategy} className="btn" type="success">
          전략 생성 하기
        </Button>
        {currentStrategyCode &&
          `전략생성 완료 - 전략코드: ${currentStrategyCode}`}
      </WingBlank>
    </SPortBacktestTabStart>
  );
};

const SPortBacktestTabStart = styled.div`
  margin: 5rem 0rem;
  .btn {
    height: 5rem;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const PortBacktestTabDetail = () => {
  const [currentStrategyCode] = useRecoilState(atomCurrentStrategyCode);
  const history = useHistory();
  useEffect(() => {
    history.push(
      process.env.PUBLIC_URL +
        `/makers/strategy-create/details/${currentStrategyCode}`,
    );
    return () => {};
  }, [history, currentStrategyCode]);

  return (
    <div>
      <Route
        path={process.env.PUBLIC_URL + `/makers/strategy-create/details/:id`}
      >
        <StrategyDetails />
      </Route>
    </div>
  );
};
const PortBacktestTabReport = () => {
  const [currentStrategyCode] = useRecoilState(atomCurrentStrategyCode);

  const history = useHistory();
  useEffect(() => {
    history.push(
      process.env.PUBLIC_URL +
        `/makers/strategy-create/report/${currentStrategyCode}`,
    );
    return () => {};
  }, [history, currentStrategyCode]);

  return (
    <div>
      <Route
        path={process.env.PUBLIC_URL + `/makers/strategy-create/report/:id`}
      >
        <MockInvestReport />
      </Route>
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
      <InspectorHeaderDetail headerTitle={headerTitle || '백테스팅'} />
      <WingBlank>
        <WideLine style={{ margin: '0 0 1.3rem 0' }} />
        <article className="tabContainer">
          <StabItem selected={tab === 0} onClick={() => handleTabIdx(0)}>
            백테스팅
          </StabItem>
          <StabItem selected={tab === 1} onClick={() => handleTabIdx(1)}>
            상세결과
          </StabItem>
          <StabItem selected={tab === 2} onClick={() => handleTabIdx(2)}>
            리포트
          </StabItem>
        </article>
      </WingBlank>
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
