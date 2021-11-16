import { SubTitle } from 'components/common/_atoms/Typos';
import CumulativeReturnChart, {
  ILineData,
} from 'components/light-weight/CumulativeReturnChart';
import React, { useMemo } from 'react';
import useBackTestReport from 'states/backtest/query/useBackTestReport';
import styled from 'styled-components';
import { toPercentage } from 'utils/parse';
import { SectionLgSkeleton } from 'components/common/_molecules/MoleculesSkeletons';

interface ICumulativeReturn {
  strategyCode: string;
  props?: any;
}

const CumulativeReturn: React.FC<ICumulativeReturn> = ({
  strategyCode,
  props,
}) => {
  const { accumulateProfitRateQuery } = useBackTestReport(strategyCode);

  const lineDatas = useMemo(() => {
    if (
      accumulateProfitRateQuery &&
      accumulateProfitRateQuery.data &&
      accumulateProfitRateQuery.data.accumulateProfitRateChartList
    ) {
      return accumulateProfitRateQuery.data.accumulateProfitRateChartList.map(
        (e) => {
          return {
            time: e.chart_date.slice(0, 10),
            value: toPercentage(e.profit_rate),
          } as ILineData;
        },
      );
    }
  }, [accumulateProfitRateQuery]);

  return (
    <SCumulativeReturn {...props}>
      <div className="flexRow" style={{ marginTop: '20px' }}>
        <SubTitle
          title="백테스팅 누적 수익률 (%)"
          style={{ margin: '20px 0px' }}
        />
      </div>
      {lineDatas !== undefined ? (
        <CumulativeReturnChart datas={lineDatas} />
      ) : (
        <SectionLgSkeleton />
      )}
      {/* <ChartCumulativeReturn /> */}
    </SCumulativeReturn>
  );
};

export default CumulativeReturn;

const SCumulativeReturn = styled.section``;
