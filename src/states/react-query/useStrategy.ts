import { useQuery } from "react-query";
import { strategyApi } from "states/api";
import { GetStrategyListNewOutput } from "states/interface/strategy/dtos";

const useStrategy = () => {
  const { data } = useQuery("getStrategyListNew", () => {
    return strategyApi.GET.getStrategyListNew();
  });
  console.log(data);

  return {
    strategyListNew: (data?.data as GetStrategyListNewOutput)
      ?.memberStrategyList,
  };
};

export default useStrategy;
