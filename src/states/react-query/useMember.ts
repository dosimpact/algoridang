import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { memberApi } from "states/api";
import {
  loginMemberInfoInput,
  loginMemberInfoOutput,
} from "states/interface/member/dtos";
import { setLocalMemberInfo } from "states/local-state";

//  Query
// (1) 나의 정보를 받는

// Mutation
// (1) 로그인을 날리는
//
//
const useMember = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery("me", () => {
    return memberApi.GET.me();
  });

  //loginMemberInfoOutput
  // AxiosError
  // loginMemberInfoInput
  const logInMutation = useMutation(
    "login",
    (body: loginMemberInfoInput) => {
      return memberApi.POST.loginMemberInfo(body);
    },
    {
      onSuccess: (result) => {
        console.log("onSuccess", result);
        const data = result.data as loginMemberInfoOutput;
        setLocalMemberInfo({ token: data.token });
      },
      onError: (error: any) => {
        if (error?.response) {
          console.log(error?.response.data);
          console.log(error?.response.status);
          console.log(error?.response.headers);
        } else if (error?.request) {
          console.log("서버 무응답");
        }
      },
    }
  );

  const logOut = () => {
    setLocalMemberInfo({ token: "" });
  };

  return {
    memberInfo: data,
    logIn: logInMutation.mutate,
    logOut,
  };
};

export default useMember;
