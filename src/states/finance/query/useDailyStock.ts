import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { financeApi } from 'states/api';
import { GetDayilStocksOutput } from 'states/finance/interface/dtos';

const useDailyStock = (
  term: string,
  take: number,
  skip: number,
  sort?: 'DESC' | 'ASC',
) => {
  const dailyStockQuery = useQuery<
    AxiosResponse<GetDayilStocksOutput>,
    AxiosError,
    GetDayilStocksOutput
  >(
    // DailyStock 이라는 기본 키와, querystring이 바뀌면 다시 refetch하도록 키를 배열로 구성
    ['DailyStock', term, skip, take, sort],
    () => {
      // Axios 의 Promise를 리턴하는 부분
      return financeApi.GET.getDailyStocks({ term, skip, take, sort });
    },
    {
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      select: (data) => data.data,
      onSuccess: (data) => {}, // 성공시 처리 eg) 파싱 등
      onError: () => {}, // 실패시 애러 핸들링 eg) 400처리 401처리
    },
  );
  // ?refactor : 400 애러 핸들링, 200 애러 핸들링 맞나 ?
  const dayilStocks = dailyStockQuery.data?.dailyStocks;
  return {
    dailyStockQuery,
    dayilStocks,
  };
};

export default useDailyStock;
