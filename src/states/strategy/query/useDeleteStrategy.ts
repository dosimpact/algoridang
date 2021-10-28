import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { strategyApi } from 'states/api';
import {
  DeleteMyStrategyByIdInput,
  DeleteMyStrategyByIdOutput,
} from '../interface/dtos';

export const useDeleteStrategy = () => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries('getMyStrategyList');
  };

  const deleteStrategyMutation = useMutation<
    AxiosResponse<DeleteMyStrategyByIdOutput>,
    AxiosError,
    DeleteMyStrategyByIdInput
  >(
    'deleteStrategyMutation',
    (body) => {
      return strategyApi.DELETE.deleteMyStrategyById(body);
    },
    {
      onSuccess: () => {
        refresh();
      },
    },
  );
  return { deleteStrategyMutation };
};
