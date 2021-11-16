import { Button } from 'components/common/_atoms/Buttons';
import WingBlank from 'components/common/_atoms/WingBlank';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import useBackTestMutation from 'states/backtest/query/useBackTestMutation';
import { atomCurrentStrategyCode } from 'states/common/recoil/dashBoard/dashBoard';
import {
  makeAddUniversals,
  makeCreateMyStrategy,
} from 'states/common/recoil/dashBoard/formState';
import {
  selector_ST1_isComplete,
  selector_ST2_isComplete,
  selector_ST3_isComplete,
} from 'states/common/recoil/dashBoard/inspector';

import useCreateStrategy from 'states/strategy/query/useCreateStrategy';
import { useDeleteStrategy } from 'states/strategy/query/useDeleteStrategy';
import styled from 'styled-components';

const BackTestingSettingTabStart = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [currentStrategyCode, setCurrentStrategyCode] = useRecoilState(
    atomCurrentStrategyCode,
  );

  const makeCreateMyStrategyValue = useRecoilValue(makeCreateMyStrategy);
  const makeAddUniversalsValue = useRecoilValue(makeAddUniversals);
  const { addUniversalMutation, createMyStrategyMutation } =
    useCreateStrategy();
  const { pushBackTestQMutation } = useBackTestMutation();
  const { deleteStrategyMutation } = useDeleteStrategy();

  const handleCreateStrategy = async () => {
    try {
      const result_1 = await toast.promise(
        createMyStrategyMutation.mutateAsync(makeCreateMyStrategyValue),
        {
          pending: '전략 생성...',
          success: '전략 생성 성공',
          error: '전략 생성 실패 🤯',
        },
        {
          position: 'bottom-right',
        },
      );
      if (!result_1.data.memberStrategy?.strategy_code)
        throw new Error('전략 생성 실패');
      const strategy_code = result_1.data.memberStrategy?.strategy_code;

      setCurrentStrategyCode(strategy_code);

      await toast.promise(
        Promise.all(
          makeAddUniversalsValue.map(async (e) => {
            return addUniversalMutation.mutateAsync({
              strategy_code,
              body: {
                ...e,
                strategy_code,
              },
            });
          }),
        ),
        {
          pending: '관심 종목 추가...',
          success: '관심 종목 추가 성공',
          error: '관심 종목 추가 실패 🤯',
        },
        {
          position: 'bottom-right',
        },
      );
      await toast.promise(
        pushBackTestQMutation.mutateAsync({ strategy_code }),
        {
          pending: '백테스트 요청...',
          success: '백테스트 요청 성공',
          error: '백테스트 요청 실패 🤯',
        },
        {
          position: 'bottom-right',
        },
      );

      toast.success(
        `전략 생성 완료(${strategy_code}). 나의 전략에서 확인해보세요. ✨`,
        {
          position: 'bottom-right',
        },
      );
    } catch (error) {
      console.log('error', error);

      toast.warning(`${error.message}`, {
        position: 'bottom-right',
      });
    }
  };

  const handleReCreateStrategy = async () => {
    setRetryCount((prev) => prev + 1);
    if (retryCount >= 10) {
      toast.error('전략 다시 만들기 오류');
      return;
    } else {
      await deleteStrategyMutation.mutateAsync({
        strategy_code: currentStrategyCode,
      });
      setCurrentStrategyCode('');
    }
  };

  const ST1_isComplete = useRecoilValue(selector_ST1_isComplete);
  const ST2_isComplete = useRecoilValue(selector_ST2_isComplete);
  const ST3_isComplete = useRecoilValue(selector_ST3_isComplete);

  const isReadyBacktesting = ST1_isComplete && ST2_isComplete;

  return (
    <SBackTestingSettingTabStart>
      <WingBlank>
        {!isReadyBacktesting && (
          <div className="errorMessage">😢 미완료 시항</div>
        )}
        {!ST1_isComplete && (
          <div className="errorMessage">1번 기본설정을 완료해주세요.</div>
        )}
        {!ST2_isComplete && (
          <div className="errorMessage">
            2번 종목관리탭에서 종목을 추가하거나 매매전략을 모두 선택해 주세요.
          </div>
        )}
        <div className="successMessage">
          {currentStrategyCode &&
            `전략생성 완료 - 전략코드: ${currentStrategyCode}

생성된 전략은 MakerPage의 나의 전략, 
Taker 모바일 페이지의 나의 모의 투자 탭에서
확인 가능합니다.

상세결과에서 수익률을 확인할 수 있습니다.
`}
        </div>

        {currentStrategyCode === '' ? (
          <Button
            onClick={handleCreateStrategy}
            className="btn"
            type={isReadyBacktesting ? 'blue' : 'gray'}
          >
            전략 생성 및 백테스팅
          </Button>
        ) : (
          <Button
            onClick={handleReCreateStrategy}
            className="btn"
            type="success"
          >
            전략 다시 만들기
          </Button>
        )}
      </WingBlank>
    </SBackTestingSettingTabStart>
  );
};

const SBackTestingSettingTabStart = styled.div`
  margin: 5rem 0rem;
  .btn {
    height: 5rem;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  .errorMessage {
    color: ${(props) => props.theme.ColorMainRed};
    min-height: 1.5rem;
    line-height: 2rem;
    margin: 2rem 0rem;
  }
  .successMessage {
    min-height: 1.5rem;
    line-height: 2rem;
    margin: 2rem 0rem;
    white-space: pre-wrap;
  }
`;
export default BackTestingSettingTabStart;
