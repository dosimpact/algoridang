import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { backtestApi } from 'states/api';
import { GetHistoryListOutput } from 'states/backtest/interface/dtos';

const useBackTestHistory = (strategy_code: string) => {
  // <TQueryFnData : 출력 , TError:애러타이핑 , TData :알맹이>
  const historiesQuery = useQuery<
    AxiosResponse<GetHistoryListOutput>,
    AxiosError,
    GetHistoryListOutput
  >(
    ['getHistories', strategy_code],
    () => backtestApi.GET.getHistories(strategy_code),
    {
      select: (data) => data.data,
    },
  );

  return {
    historiesQuery,
  };
};
export default useBackTestHistory;
