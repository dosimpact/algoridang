import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { GetBaseTradingStrategyListOutput } from 'states/interface/trading/dtos';
import { tradingApi } from 'states/api';
import { BaseTradingStrategy } from 'states/interface/trading/entities';

export const useTechnicals = () => {
  const GetTechnicalStrategyListQuery = useQuery<
    AxiosResponse<GetBaseTradingStrategyListOutput>,
    AxiosError<GetBaseTradingStrategyListOutput>,
    BaseTradingStrategy[] | undefined
  >(
    ['getBaseTradingStrategyList'],
    () => {
      return tradingApi.GET.getBaseTradingStrategyList();
    },
    {
      select: (data) => data.data.baseTradingStrategyList,
    },
  );

  return { GetTechnicalStrategyListQuery };
};
