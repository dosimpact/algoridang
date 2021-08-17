import ChartMonthlyReturn from "components/data-display/ChartMonthlyReturn";
import { SubTitle } from "components/data-display/Typo";
import React, { useMemo } from "react";
import useBackTestReport from "states/react-query/backtest/useBackTestReport";
import styled from "styled-components";
import { toPercentage } from "utils/parse";

interface IMonthlyReturn {
  strategyCode: string;
  props?: any;
}

const MonthlyReturn: React.FC<IMonthlyReturn> = ({ strategyCode, props }) => {
  const { montlyProfitRateQuery } = useBackTestReport(strategyCode + "");
  console.log("montlyProfitRateQuery", montlyProfitRateQuery);

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
      <div className="flexRow" style={{ marginTop: "50px" }}>
        <SubTitle
          title="백테스팅 월간 수익률 (%)"
          style={{ margin: "20px 0px" }}
        />
      </div>
      <ChartMonthlyReturn data={data} labels={labels} />
    </SMonthlyReturn>
  );
};

export default MonthlyReturn;

const SMonthlyReturn = styled.section``;
