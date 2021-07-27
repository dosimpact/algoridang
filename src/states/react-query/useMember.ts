import { useQuery, useQueryClient } from "react-query";

// (1) 로그인을 날리는
// (2) 나의 정보를 받는
// (3) 로그아웃을 날리는
// (4) 나의 정보를 업데이트 하는
const useMember = () => {
  const queryClient = useQueryClient();
  const {} = useQuery("login", () => {});

  const logIn = () => {};
  const logOut = () => {};
  const me = () => {};
  const updateMe = () => {};

  return {};
};
