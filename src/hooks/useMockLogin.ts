import React from 'react';
import useMember from 'states/react-query/useMember';

const useLogin = () => {
  // 사용자 정보
  const { logIn, me } = useMember();
  const email = React.useMemo(() => {
    return me.data?.email_id;
  }, [me]);

  React.useEffect(() => {
    logIn({
      email_id: 'ypd03008@gmail.com',
      password: 'ypd03008',
    });
    return () => {};
  }, []);

  const mockUpUserLogin = () => {
    logIn({
      email_id: 'ypd03008@gmail.com',
      password: 'ypd03008',
    });
  };

  return { email, mockUpUserLogin };
};
export default useLogin;
