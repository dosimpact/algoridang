import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { tradingApi } from 'states/api';
import { GetBaseTradingStrategyListOutput } from 'states/trading/interface/dtos';

// TODO 레거시 정리(옛날 Maker)
const useTrading = () => {
  const {
    data: baseTradingStrategyList,
    isError: baseTradingStrategyListError,
    isLoading: baseTradingStrategyListLoading,
  } = useQuery<{}, AxiosError, AxiosResponse<GetBaseTradingStrategyListOutput>>(
    'getBaseTradingStrategyList',
    () => {
      return tradingApi.GET.getBaseTradingStrategyList();
    },
    {
      onError: (e) => {
        if (e.response) {
          // 서버 애러 응답 받은 경우
        } else {
          // 서버off인경우
        }
      },
      onSuccess: (e) => {
        // type : AxiosResponse<GetStrategyListNewOutput>>
      },
    },
  );
  return {
    baseTradingStrategyList:
      baseTradingStrategyList?.data?.baseTradingStrategyList,
    baseTradingStrategyListError,
    baseTradingStrategyListLoading,
  };
};

export default useTrading;
