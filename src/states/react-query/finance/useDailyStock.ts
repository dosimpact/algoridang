import React from "react";
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
    ["DailyStock", term, skip, take],
    () => {
      return financeApi.GET.dailystock({ term, skip, take, sort });
    },
    {
      staleTime: 5000,
      cacheTime: 5000,
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
