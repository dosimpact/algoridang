import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { strategyApi } from 'states/api';
import {
  CreateMyStrategyInput,
  CreateMyStrategyOutput,
} from 'states/strategy/interface/dtos';
import {
  AddUniversalInput,
  AddUniversalOutput,
} from 'states/trading/interface/dtos';

const useCreateStrategy = () => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries('getMyStrategyList');
  };

  // <TData 출력데이터 + Axios응답, TError 애러 데이터 ,TVariables input body 데이터>
  const createMyStrategyMutation = useMutation<
    AxiosResponse<CreateMyStrategyOutput>,
    AxiosError,
    CreateMyStrategyInput
  >((body) => strategyApi.POST.createMyStrategy(body), {
    onSuccess: () => {
      refresh();
    },
    onError: (error) => {
      if (error.response) {
        console.log(error?.response.data);
        console.log(error?.response.status);
      } else {
        console.log(`[Error ${createMyStrategyMutation}] 서버 무응답 `);
      }
    },
  });

  const addUniversalMutation = useMutation<
    AxiosResponse<AddUniversalOutput>,
    AxiosError,
    {
      strategy_code: string;
      body: AddUniversalInput;
    }
  >((data) => strategyApi.POST.addUniversal(data.strategy_code, data.body));

  return {
    createMyStrategyMutation,
    addUniversalMutation,
  };
};

export default useCreateStrategy;
