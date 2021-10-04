import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { strategyApi } from 'states/api';
import {
  ForkStrategyInput,
  ForkStrategyOutput,
} from 'states/strategy/interface/dtos';

export const useForkStrategy = () => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries('getMyStrategyList');
  };

  const forkStrategyMutation = useMutation<
    AxiosResponse<ForkStrategyOutput>,
    AxiosError,
    ForkStrategyInput
  >(['forkStrategyMutation'], (body) => strategyApi.POST.forkStrategy(body), {
    onSuccess: () => {
      refresh();
    },
    onError: (error) => {
      if (error?.response) {
        console.log(error?.response.data);
        console.log(error?.response.status);
      } else if (error?.request) {
        console.log('서버 응답없음');
      }
    },
  });

  return { forkStrategyMutation };
};
