import { useMutation, useQuery, useQueryClient } from "react-query";
import { strategyApi } from "states/api";
import { GetStrategyListNewOutput } from "states/interface/strategy/dtos";
import { MemberStrategy } from "states/interface/strategy/entities";

const useStrategy = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery("getStrategyListNew", () => {
    return strategyApi.GET.getStrategyListNew();
  });
  console.log(data);

  return {
    strategyListNew: (data?.data as GetStrategyListNewOutput)
      ?.memberStrategyList,
  };
};

export default useStrategy;
