import { useMemo } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { strategyApi } from 'states/api';
import { GetStrategyByIdOutput } from 'states/strategy/interface/dtos';

const useStrategyDetail = (strategy_code: string) => {
  // 타이핑
  // <TQueryFnData - API호출 후 데이터 타이핑 ( select:(data)의 data타이핑),
  //  TError - 애러 데이터 타이핑
  // ,TData  - select 데이터 결과 타이핑 (실제 데이터)>
  // *select 함수를 안쓰면 TQueryFnData 랑 TData 같다.
  const strategyDetailQuery = useQuery<
    AxiosResponse<GetStrategyByIdOutput>,
    AxiosError,
    GetStrategyByIdOutput
  >(
    ['getStrategyById', strategy_code],
    () => {
      return strategyApi.GET.getStrategyById(strategy_code);
    },
    {
      select: (data) => {
        return data.data;
      },
      onError: (e) => {
        if (e.response) {
          // 서버 애러 응답 받은 경우
        } else {
          // 서버off인경우
        }
      },
      onSuccess: (e) => {
        // type : AxiosResponse<GetStrategyListNewOutput>>
      },
    },
  );

  // 받아온 데이터중 memberStrategy 에 관한 데이터 메모
  const memberStrategy = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy,
    [strategyDetailQuery?.data],
  );
  // const backtestDetailInfo = useMemo(
  //   () => strategyDetailQuery?.data?.memberStrategy?.backtestDetailInfo,
  //   [strategyDetailQuery?.data]
  // );
  // 아온 데이터중 universal 에 관한 데이터 메모
  const firstUniversal = useMemo(
    () =>
      strategyDetailQuery?.data?.memberStrategy &&
      strategyDetailQuery?.data?.memberStrategy.universal &&
      strategyDetailQuery?.data?.memberStrategy?.universal.length >= 1 &&
      strategyDetailQuery?.data?.memberStrategy?.universal[0],
    [strategyDetailQuery?.data],
  );

  const investProfitInfo = useMemo(
    () => strategyDetailQuery?.data?.memberStrategy?.investProfitInfo,
    [strategyDetailQuery?.data],
  );

  const histories = useMemo(
    () =>
      strategyDetailQuery?.data?.memberStrategy?.histories.map((history) => ({
        ...history,
        history_date: String(history.history_date).substr(0, 10),
      })),
    [strategyDetailQuery?.data],
  ) as History[] | undefined;
  // console.log("histories", histories);
  // console.log("investProfitInfo", investProfitInfo);
  // console.log("firstUniversal", firstUniversal);

  return {
    strategyDetailQuery,
    memberStrategy,
    firstUniversal,
    investProfitInfo,
    histories,
  };
};

export default useStrategyDetail;
