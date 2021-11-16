import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { strategyApi } from 'states/api';
import { SearchStrategyOutput } from 'states/strategy/interface/dtos';

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
