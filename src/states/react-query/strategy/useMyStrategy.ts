import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { strategyApi } from "states/api";
import { GetMyStrategyListOutput } from "states/interface/strategy/dtos";

export const useMyStrategy = (strategy_code?: string) => {
  const getMyStrategyListQuery = useQuery<
    AxiosResponse<GetMyStrategyListOutput>,
    AxiosError,
    GetMyStrategyListOutput
  >(
    ["getMyStrategyList"],
    async () => {
      return strategyApi.GET.getMyStrategyList();
    },
    {
      select: (data) => data.data,
    }
  );

  const getMyStrategyByIdQuery = useQuery<AxiosResponse, AxiosError>(
    ["getMyStrategyById", strategy_code],
    async () => {
      strategy_code = strategy_code || "1";
      return strategyApi.GET.getMyStrategyById(strategy_code);
    },
    {
      select: (data) => data.data,
    }
  );

  return { getMyStrategyListQuery, getMyStrategyByIdQuery };
};
