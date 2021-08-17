import { SubTitle } from "components/data-display/Typo";
import CumulativeReturnChart, {
  ILineData,
} from "components/light-weight/CumulativeReturnChart";
import React, { useMemo } from "react";
import useBackTestReport from "states/react-query/backtest/useBackTestReport";
import styled from "styled-components";
import { toPercentage } from "utils/parse";

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
        }
      );
    }
  }, [accumulateProfitRateQuery]);

  return (
    <SCumulativeReturn {...props}>
      <div className="flexRow" style={{ marginTop: "20px" }}>
        <SubTitle
          title="백테스팅 누적 수익률 (%)"
          style={{ margin: "20px 0px" }}
        />
      </div>
      <CumulativeReturnChart datas={lineDatas} />
      {/* <ChartCumulativeReturn /> */}
    </SCumulativeReturn>
  );
};

export default CumulativeReturn;

const SCumulativeReturn = styled.section``;
