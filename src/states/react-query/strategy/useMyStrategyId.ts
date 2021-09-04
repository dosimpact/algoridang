import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { strategyApi } from "states/api";
import { GetMyStrategyListOutput } from "states/interface/strategy/dtos";

// todo : 고민 : select로 골라서 줄것인가, 각자의 컴포넌트에서 알아서 memo(select)를 하도록 할것인가
export const useMyStrategyId = (strategy_code?: string) => {
  const getMyStrategyByIdQuery = useQuery<AxiosResponse, AxiosError>(
    ["getMyStrategyById", strategy_code],
    async () => {
      strategy_code = strategy_code || "1";
      return strategyApi.GET.getMyStrategyById(strategy_code);
    },
    {
      select: (data) => data.data,
      retry: 0,
    }
  );

  return { getMyStrategyByIdQuery };
};
