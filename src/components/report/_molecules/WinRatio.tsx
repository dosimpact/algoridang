import ChartWinRatio from 'components/data-display/ChartWinRatio';
import { SubTitle } from 'components/common/_atoms/Typos';
import React from 'react';
import { useParams } from 'react-router-dom';
import useBackTestReport from 'states/backtest/query/useBackTestReport';
import styled from 'styled-components';

interface IWinRatio {
  props?: any;
}

const WinRatio: React.FC<IWinRatio> = ({ props }) => {
  const params = useParams() as { id: string };
  const strategyCode = params?.id || 0;
  const { winRatioQuery } = useBackTestReport(strategyCode + '');

  return (
    <SWinRatio {...props}>
      <div className="flexRow" style={{ marginTop: '50px' }}>
        <SubTitle title="백테스팅 승률" style={{ margin: '20px 0px' }} />
      </div>
      {winRatioQuery.isLoading && 'loading...'}
      {winRatioQuery.data && winRatioQuery.data.backtestWinRatio && (
        <ChartWinRatio
          a={winRatioQuery.data.backtestWinRatio.loss_count}
          b={winRatioQuery.data.backtestWinRatio.win_count}
        />
      )}
    </SWinRatio>
  );
};

export default WinRatio;

const SWinRatio = styled.section``;
