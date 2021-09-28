import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { strategyApi } from 'states/api';
import {
  GetStrategyListHighViewOutput,
  GetStrategyListNewOutput,
  GetStrategyListTypeOutput,
} from 'states/strategy/interface/dtos';

const useStrategy = () => {
  const {
    data: strategyListNew,
    isError: strategyListNewError,
    isLoading: strategyListNewLoading,
  } = useQuery<{}, AxiosError, AxiosResponse<GetStrategyListNewOutput>>(
    'getStrategyListNew',
    () => {
      return strategyApi.GET.getStrategyListNew();
    },
    {
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
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

  const {
    data: strategyListHighView,
    isError: strategyListHighViewError,
    isLoading: strategyListHighViewLoading,
  } = useQuery<{}, AxiosError, AxiosResponse<GetStrategyListHighViewOutput>>(
    'getStrategyListHighView',
    () => {
      return strategyApi.GET.getStrategyListHighView();
    },
    {
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
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

  const {
    data: strategyListType,
    isError: strategyListTypeError,
    isLoading: strategyListTypeLoading,
  } = useQuery<{}, AxiosError, AxiosResponse<GetStrategyListTypeOutput>>(
    'getStrategyListType',
    () => {
      return strategyApi.GET.getStrategyListType();
    },
    {
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
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
    strategyListNew: strategyListNew?.data?.memberStrategyList,
    strategyListHighView: strategyListHighView?.data?.memberStrategyList,
    strategyListNeutral:
      strategyListType?.data.memberStrategyRecordList?.Neutral,
    strategyListRiskTaking:
      strategyListType?.data.memberStrategyRecordList?.RiskTaking,
    strategyListStableIncome:
      strategyListType?.data.memberStrategyRecordList?.StableIncome,
    strategyListUnclassified:
      strategyListType?.data.memberStrategyRecordList?.Unclassified,

    isError:
      strategyListNewError ||
      strategyListHighViewError ||
      strategyListTypeError,

    strategyListNewLoading,
    strategyListHighViewLoading,
    strategyListTypeLoading,
  };
};

export default useStrategy;
