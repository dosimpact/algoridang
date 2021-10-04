import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { backtestApi } from 'states/api';
import {
  PushBackTestQInput,
  PushBackTestQOutput,
} from 'states/backtest/interface/dtos';

const useBackTestMutation = () => {
  // <TData 출력데이터 + Axios응답, TError 애러 데이터 ,TVariables input body 데이터>
  const pushBackTestQMutation = useMutation<
    AxiosResponse<PushBackTestQOutput>,
    AxiosError,
    PushBackTestQInput
  >((body) => backtestApi.POST.pushBackTestQ(body));

  return { pushBackTestQMutation };
};
export default useBackTestMutation;
