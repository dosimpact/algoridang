import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { strategyApi } from 'states/api';
import {
  UpdateMyStrategyByIdInput,
  UpdateMyStrategyByIdOutput,
} from 'states/strategy/interface/dtos';

export const useUpdateMyStrategy = () => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries('getMyStrategyList');
    queryClient.invalidateQueries('getMyStrategyById');
  };
  const updateMyStrategyMutation = useMutation<
    AxiosResponse<UpdateMyStrategyByIdOutput>,
    AxiosError,
    UpdateMyStrategyByIdInput
  >(
    ['UpdateMyStrategyByIdOutput'],
    (body) => strategyApi.PATCH.updateMyStrategy(body),
    {
      onSuccess: () => {
        refresh();
      },
    },
  );

  return { updateMyStrategyMutation };
};
