import React from 'react';
import styled from 'styled-components';
import WingBlank from 'components/common/_atoms/WingBlank';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import StrategyCardInfo from 'components/common/_molecules/StrategyCardInfo';
import Scrollable from 'components/common/_molecules/Scrollable';
import QuantStatesReport from 'components/report/_organisms/QuantStatesReport';
import { MemberStrategy } from 'states/strategy/interface/entities';

interface IStrategyBackTestReport {
  showForkButton?: boolean;
  strategyCode: string;
  memberStrategy: MemberStrategy | undefined;
}

const StrategyBackTestReport: React.FC<IStrategyBackTestReport> = ({
  showForkButton,
  memberStrategy,
  strategyCode,
}) => {
  showForkButton = showForkButton === undefined ? true : false;

  if (strategyCode === '0') {
    return (
      <div>
        <WingBlank>전략이 없습니다.</WingBlank>
      </div>
    );
  }

  return (
    <PStrategyBTDetail>
      <WingBlank>
        <WhiteSpace />
        {memberStrategy && <StrategyCardInfo strategy={memberStrategy} />}
        <Scrollable />
      </WingBlank>
      <QuantStatesReport strategyCode={strategyCode} />
    </PStrategyBTDetail>
  );
};

export default StrategyBackTestReport;

const PStrategyBTDetail = styled.section`
  margin-bottom: 120px;
  /* overflow: hidden; */
`;
