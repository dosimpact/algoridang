import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { memberApi } from "states/common/api";
import {
  loginMemberInfoInput,
  loginMemberInfoOutput,
} from "states/common/dtos";
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

  // <출력값 TData,애러 타이핑  TError, 입력값 타이핑 TVariables>

  // const logInMutation = useMutation<
  //   loginMemberInfoOutput,
  //   AxiosError,
  //   loginMemberInfoInput
  // >(
  //   "login",
  //   ({ email_id, password }) => {
  //      memberApi.POST.loginMemberInfo({ email_id, password });
  //      return {}
  //     },
  //   {
  //     onSuccess: (result) => {
  //       console.log("onSuccess", result);
  //     },
  //     onError: (error: any) => {
  //       if (error?.response) {
  //         // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
  //         console.log(error?.response.data); // 애러의 응답안에 들어 있다.
  //         // {statusCode: 400, message: Array(2), error: "Bad Request"}error: "Bad Request"message: (2) ["email_id must be an email", "password must be a string"]0: "email_id must be an email"1: "password must be a string"length: 2__proto__: Array(0)statusCode: 400__proto__: Object
  //         console.log(error?.response.status);
  //         // 400
  //         console.log(error?.response.headers);
  //         // {content-length: "108", content-type: "application/json; charset=utf-8"}
  //       } else if (error?.request) {
  //         console.log("서버 무응답");
  //       }
  //     },
  //   }
  // );

  // const logIn = () => {};
  // const logOut = () => {};
  // const me = () => {};
  // const updateMe = () => {};

  return {
    memberInfo: data,
    logIn: logInMutation.mutate,
  };
};

export default useMember;
