import { useQuery } from 'react-query';
import { financeApi } from 'states/api';
import { GetCorporationsWithTermOutput } from 'states/finance/interface/dtos';

interface IuseCorporationOption {
  term: string;
}
const useCorporation = ({ term }: IuseCorporationOption) => {
  const { data, isLoading, error, refetch } = useQuery(
    // Corporation 이라는 기본 키와, querystring이 바뀌면 다시 refetch하도록 키를 배열로 구성
    ['Corporation', term],
    () => {
      // Axios 의 Promise를 리턴하는 부분
      return financeApi.GET.getCorporationsWithTerm({ term });
    },
    {
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      onSuccess: () => {}, // 성공시 처리 eg) 파싱 등
      onError: () => {}, // 실패시 애러 핸들링 eg) 400처리 401처리
    },
  );
  const corp = data?.data as GetCorporationsWithTermOutput;
  return {
    corporations: corp?.corporations,
    isLoading,
    error,
    refetch,
  };
};

export default useCorporation;
