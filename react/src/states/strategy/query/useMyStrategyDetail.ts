import { useMemo } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { strategyApi } from 'states/api';
import { GetStrategyByIdOutput } from 'states/strategy/interface/dtos';

// todo : 고민 : select로 골라서 줄것인가, 각자의 컴포넌트에서 알아서 memo(select)를 하도록 할것인가
export const useMyStrategyDetail = (strategy_code: string) => {
  const myStrategyDetailQuery = useQuery<
    AxiosResponse<GetStrategyByIdOutput>,
    AxiosError,
    GetStrategyByIdOutput
  >(
    ['getMyStrategyById', strategy_code],
    async () => {
      return strategyApi.GET.getMyStrategyById(strategy_code);
    },
    {
      select: (data) => data.data,
      retry: 0,
    },
  );

  // 받아온 데이터중 memberStrategy 에 관한 데이터 메모
  const memberStrategy = useMemo(
    () => myStrategyDetailQuery?.data?.memberStrategy,
    [myStrategyDetailQuery?.data],
  );
  // const backtestDetailInfo = useMemo(
  //   () => myStrategyDetailQuery?.data?.memberStrategy?.backtestDetailInfo,
  //   [myStrategyDetailQuery?.data]
  // );
  // 아온 데이터중 universal 에 관한 데이터 메모
  const firstUniversal = useMemo(
    () =>
      myStrategyDetailQuery?.data?.memberStrategy &&
      myStrategyDetailQuery?.data?.memberStrategy.universal &&
      myStrategyDetailQuery?.data?.memberStrategy?.universal.length >= 1 &&
      myStrategyDetailQuery?.data?.memberStrategy?.universal[0],
    [myStrategyDetailQuery?.data],
  );

  const investProfitInfo = useMemo(
    () => myStrategyDetailQuery?.data?.memberStrategy?.investProfitInfo,
    [myStrategyDetailQuery?.data],
  );

  const histories = useMemo(
    () =>
      myStrategyDetailQuery?.data?.memberStrategy?.histories.map((history) => ({
        ...history,
        history_date: String(history.history_date).substr(0, 10),
      })),
    [myStrategyDetailQuery?.data],
  );
  // console.log("histories", histories);
  // console.log("investProfitInfo", investProfitInfo);
  // console.log("firstUniversal", firstUniversal);
  return {
    myStrategyDetailQuery,
    memberStrategy,
    firstUniversal,
    investProfitInfo,
    histories,
  };
};
