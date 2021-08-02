import { useQuery } from "react-query";
import { financeApi } from "states/api";
import { GetDayilStocksOutput } from "states/interface/finance/dtos";

const useDailyStock = (
  term: string,
  take: number,
  skip: number,
  sort?: "DESC" | "ASC"
) => {
  const { data, isLoading, error } = useQuery(
    // DailyStock 이라는 기본 키와, querystring이 바뀌면 다시 refetch하도록 키를 배열로 구성
    ["DailyStock", term, skip, take, sort],
    () => {
      // Axios 의 Promise를 리턴하는 부분
      return financeApi.GET.dailystock({ term, skip, take, sort });
    },
    {
      staleTime: 5000,
      cacheTime: 5000,
      onSuccess: () => {}, // 성공시 처리 eg) 파싱 등
      onError: () => {}, // 실패시 애러 핸들링 eg) 400처리 401처리
    }
  );
  // ?refactor : 400 애러 핸들링, 200 애러 핸들링 맞나 ?
  const dayilStocks = data?.data as GetDayilStocksOutput;

  return {
    dayilStocks: dayilStocks?.dailyStocks,
    isLoading,
    error: error || dayilStocks?.error,
  };
};

export default useDailyStock;
