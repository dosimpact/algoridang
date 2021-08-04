import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { tradingApi } from "states/api";
import { getBaseTradingStrategyListOutput } from "states/interface/trading/dtos";

const useTrading = () => {
  const {
    data: baseTradingStrategyList,
    isError: baseTradingStrategyListError,
    isLoading: baseTradingStrategyListLoading,
  } = useQuery<{}, AxiosError, AxiosResponse<getBaseTradingStrategyListOutput>>(
    "getBaseTradingStrategyList",
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
    }
  );
  return {
    baseTradingStrategyList:
      baseTradingStrategyList?.data?.baseTradingStrategyList,
    baseTradingStrategyListError,
    baseTradingStrategyListLoading,
  };
};

export default useTrading;
