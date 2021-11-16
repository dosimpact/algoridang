import ChartMonthlyReturn from 'components/data-display/ChartMonthlyReturn';
import { SubTitle } from 'components/common/_atoms/Typos';
import React, { useMemo } from 'react';
import useBackTestReport from 'states/backtest/query/useBackTestReport';
import styled from 'styled-components';
import { toPercentage } from 'utils/parse';
import { SectionLgSkeleton } from 'components/common/_molecules/MoleculesSkeletons';

interface IMonthlyReturn {
  strategyCode: string;
  props?: any;
}

const MonthlyReturn: React.FC<IMonthlyReturn> = ({ strategyCode, props }) => {
  const { montlyProfitRateQuery } = useBackTestReport(strategyCode + '');
  // console.log("montlyProfitRateQuery", montlyProfitRateQuery);

  const data = useMemo(() => {
    if (montlyProfitRateQuery?.data?.montlyProfitRateChartList) {
      return montlyProfitRateQuery?.data?.montlyProfitRateChartList.map((e) => {
        return Number(toPercentage(e.profit_rate));
      });
    }
    return [];
  }, [montlyProfitRateQuery]);

  const labels = useMemo(() => {
    if (montlyProfitRateQuery?.data?.montlyProfitRateChartList) {
      return montlyProfitRateQuery?.data?.montlyProfitRateChartList.map((e) => {
        return e.chart_month.slice(0, 10);
      });
    }
    return [];
  }, [montlyProfitRateQuery]);
  return (
    <SMonthlyReturn {...props}>
      <div className="flexRow" style={{ marginTop: '50px' }}>
        <SubTitle
          title="백테스팅 월간 수익률 (%)"
          style={{ margin: '20px 0px' }}
        />
      </div>
      {data.length !== 0 ? (
        <ChartMonthlyReturn data={data} labels={labels} />
      ) : (
        <SectionLgSkeleton />
      )}
    </SMonthlyReturn>
  );
};

export default MonthlyReturn;

const SMonthlyReturn = styled.section``;
