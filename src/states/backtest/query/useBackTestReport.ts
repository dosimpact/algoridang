import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { backtestApi } from 'states/api';
import {
  GetAccumulateProfitRateChartListOutput,
  GetBacktestWinRatioOutput,
  //   GetDailyProfitRateChartListOutput,
  GetMontlyProfitRateChartListOutput,
} from 'states/backtest/interface/dtos';

const useBackTestReport = (strategy_code: string) => {
  // <TQueryFnData : 출력 , TError:애러타이핑 , TData :알맹이>
  const accumulateProfitRateQuery = useQuery<
    AxiosResponse<GetAccumulateProfitRateChartListOutput>,
    AxiosError,
    GetAccumulateProfitRateChartListOutput
  >(
    ['getAccumulateProfitRate', strategy_code],
    () => backtestApi.GET.getAccumulateProfitRate(strategy_code),
    {
      select: (data) => data.data,
    },
  );

  const montlyProfitRateQuery = useQuery<
    AxiosResponse<GetMontlyProfitRateChartListOutput>,
    AxiosError,
    GetMontlyProfitRateChartListOutput
  >(
    ['getMontlyProfitRate', strategy_code],
    () => backtestApi.GET.getMontlyProfitRate(strategy_code),
    {
      select: (data) => data.data,
    },
  );

  //   const dailyProfitRateQuery = useQuery<
  //     AxiosResponse<GetDailyProfitRateChartListOutput>,
  //     AxiosError,
  //     GetDailyProfitRateChartListOutput
  //   >(
  //     ["getDailyProfitRate", strategy_code],
  //     () => backtestApi.GET.getDailyProfitRate(strategy_code),
  //     {
  //       select: (data) => data.data,
  //     }
  //   );

  const winRatioQuery = useQuery<
    AxiosResponse<GetBacktestWinRatioOutput>,
    AxiosError,
    GetBacktestWinRatioOutput
  >(
    ['getWinRatio', strategy_code],
    () => backtestApi.GET.getWinRatio(strategy_code),

    { select: (data) => data.data },
  );

  return {
    accumulateProfitRateQuery,
    montlyProfitRateQuery,
    winRatioQuery,
  };
};
export default useBackTestReport;
