import React from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { strategyApi } from 'states/api';
import { SearchStrategyOutput } from 'states/interface/strategy/dtos';

interface IuseSearchStrategy {
  term: string;
  type: 'name' | 'ticker';
}

const useSearchStrategy = ({ term, type }: IuseSearchStrategy) => {
  const searchStrategyQuery = useQuery<
    AxiosResponse<SearchStrategyOutput>,
    AxiosError,
    SearchStrategyOutput
  >(
    ['searchStrategy', term],
    () => {
      return strategyApi.GET.searchStrategy(term, type);
    },
    { select: (data) => data.data },
  );
  return { searchStrategyQuery };
};
export default useSearchStrategy;
