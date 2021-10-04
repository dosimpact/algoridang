import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { memberApi } from 'states/api';
import {
  LoginMemberInfoInput,
  LoginMemberInfoOutput,
  MeOutput,
} from 'states/member/interface/dtos';
import { setLocalMemberInfo } from 'states/local-state';

//  Query
// (1) 나의 정보를 받는

// Mutation
// (1) 로그인을 날리는
//
//
const useMember = () => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries('me');
  };
  const me = useQuery<AxiosResponse<MeOutput>, AxiosError, MeOutput>(
    'me',
    () => {
      return memberApi.GET.me();
    },
    {
      select: (data) => {
        return data.data;
      },
    },
  );

  //LoginMemberInfoOutput
  // AxiosError
  // LoginMemberInfoInput
  const logInMutation = useMutation(
    'login',
    (body: LoginMemberInfoInput) => {
      return memberApi.POST.loginMemberInfo(body);
    },
    {
      onSuccess: (result) => {
        console.log('onSuccess', result);
        const data = result.data as LoginMemberInfoOutput;
        setLocalMemberInfo({ token: data.token });
        refresh();
      },
      onError: (error: any) => {
        if (error?.response) {
          console.log(error?.response.data);
          console.log(error?.response.status);
          console.log(error?.response.headers);
        } else if (error?.request) {
          console.log('서버 무응답');
        }
      },
    },
  );

  const logOut = () => {
    setLocalMemberInfo({ token: '' });
  };

  return {
    me,
    logIn: logInMutation.mutate,
    logOut,
  };
};

export default useMember;
