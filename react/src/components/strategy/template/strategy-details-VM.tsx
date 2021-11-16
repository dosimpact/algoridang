import React, { useCallback, useState } from 'react';
import useStrategyDetail from 'states/strategy/query/useStrategyDetail';
import StrategyDetailsTemplate from '../_organisms/StrategyDetailsTemplate';
import StrategyBackTestReport from '../_organisms/StrategyBackTestReport';
import StrategyEarningReport from '../_organisms/StrategyEarningReport';
import NavHeaderDetail from 'components/common/_molecules/NavHeaderDetail';
import StrategyMockInvestCreate from '../_organisms/StrategyMockInvestCreate';

//
export type StrategyDetailsTypes =
  | 'detail'
  | 'investEarningReport'
  | 'quantStatesReport'
  | 'mockInvestStart';

const StrategyDetailsVM: React.FC<{
  strategyCode: string;
  showType?: StrategyDetailsTypes;
}> = ({ strategyCode, showType }) => {
  const {
    strategyDetailQuery,
    firstUniversal,
    histories,
    investProfitInfo,
    memberStrategy,
  } = useStrategyDetail(strategyCode);

  const [type, setType] = useState<StrategyDetailsTypes>(showType || 'detail');

  const typeToTitle = useCallback(() => {
    if (type === 'detail') return '투자 전략 상세';
    if (type === 'investEarningReport') return '전략 상세 리포트';
    if (type === 'mockInvestStart') return '전략 생성 하기';
    if (type === 'quantStatesReport') return '백테스트 리포트';
  }, [type]);

  const handleNav = useCallback(() => {
    if (type === 'detail') setType('detail');
    if (type === 'investEarningReport') setType('detail');
    if (type === 'mockInvestStart') setType('detail');
    if (type === 'quantStatesReport') setType('detail');
  }, [type]);

  return (
    <>
      <NavHeaderDetail
        onClickBack={type === 'detail' ? undefined : handleNav}
        headerTitle={typeToTitle() || ''}
      />
      {type === 'detail' && (
        <StrategyDetailsTemplate
          strategyCode={strategyCode}
          strategyDetailQuery={strategyDetailQuery}
          firstUniversal={firstUniversal}
          histories={histories}
          investProfitInfo={investProfitInfo}
          memberStrategy={memberStrategy}
          onClickMockInvest={() => {
            setType('mockInvestStart');
          }}
          onClickInvestEarningReport={() => {
            setType('investEarningReport');
          }}
          onClickQuantStatesReport={() => {
            setType('quantStatesReport');
          }}
        />
      )}
      {type === 'quantStatesReport' && (
        <StrategyBackTestReport
          memberStrategy={memberStrategy}
          strategyCode={strategyCode}
        />
      )}
      {type === 'investEarningReport' && (
        <StrategyEarningReport
          strategyCode={strategyCode}
          onClickMockInvest={() => {
            console.log('onClickMockInvest');
          }}
        />
      )}
      {type === 'mockInvestStart' && (
        <StrategyMockInvestCreate
          strategyCode={strategyCode}
          onSuccessForkStrategy={() => {
            console.log('onSuccessForkStrategy');
          }}
        />
      )}
    </>
  );
};

export default StrategyDetailsVM;
