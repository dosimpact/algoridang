import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { financeApi } from 'states/api';
import { GetCorporationsOutput } from 'states/finance/interface/dtos';

const useCorporations = () => {
  const GetCorporationsQuery = useQuery<
    AxiosResponse<GetCorporationsOutput>,
    AxiosError,
    GetCorporationsOutput
  >(
    ['Corporations'],
    () => {
      return financeApi.GET.getCorporations();
    },
    {
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      onSuccess: () => {}, // 성공시 처리 eg) 파싱 등
      onError: () => {}, // 실패시 애러 핸들링 eg) 400처리 401처리
      select: (data) => data.data,
    },
  );
  return {
    GetCorporationsQuery,
  };
};

export default useCorporations;
