import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { strategyApi } from "states/api";
import { GetStrategyByIdOutput } from "states/interface/strategy/dtos";

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
    ["getStrategyById", strategy_code],
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
    }
  );
  return {
    strategyDetailQuery,
  };
};

export default useStrategyDetail;
