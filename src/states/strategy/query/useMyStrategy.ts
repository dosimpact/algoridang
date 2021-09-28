import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { strategyApi } from 'states/api';
import { GetMyStrategyListOutput } from 'states/strategy/interface/dtos';

// todo : 고민 : select로 골라서 줄것인가, 각자의 컴포넌트에서 알아서 memo(select)를 하도록 할것인가
export const useMyStrategy = () => {
  const getMyStrategyListQuery = useQuery<
    AxiosResponse<GetMyStrategyListOutput>,
    AxiosError,
    GetMyStrategyListOutput
  >(
    ['getMyStrategyList'],
    async () => {
      return strategyApi.GET.getMyStrategyList();
    },
    {
      select: (data) => data.data,
    },
  );

  return { getMyStrategyListQuery };
};
