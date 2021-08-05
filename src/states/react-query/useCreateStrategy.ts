import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { strategyApi } from "states/api";
import {
  CreateMyStrategyInput,
  CreateMyStrategyOutput,
} from "states/interface/strategy/dtos";
import {
  AddUniversalInput,
  AddUniversalOutput,
} from "states/interface/trading/dtos";

const useCreateStrategy = () => {
  // <TData 출력데이터 + Axios응답, TError 애러 데이터 ,TVariables input body 데이터>
  const createMyStrategyMutation = useMutation<
    AxiosResponse<CreateMyStrategyOutput>,
    AxiosError,
    CreateMyStrategyInput
  >((body) => strategyApi.POST.createMyStrategy(body));

  const addUniversalMutation = useMutation<
    AxiosResponse<AddUniversalOutput>,
    AxiosError,
    {
      strategy_code: string;
      body: AddUniversalInput;
    }
  >((data) => strategyApi.POST.addUniversal(data.strategy_code, data.body));

  const testMutation = useMutation<AxiosResponse, AxiosError, Object>((data) =>
    strategyApi.POST.test(data)
  );

  return {
    createMyStrategyMutation,
    addUniversalMutation,
    testMutation,
  };
};

export default useCreateStrategy;
