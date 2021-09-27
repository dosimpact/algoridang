import React from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { backtestApi } from 'states/api';
import {
  RequestMiniBacktestingInput,
  RequestMiniBacktestingOutput,
} from 'states/interface/backtest/dtos';

const useMiniBacktest = () => {
  const reqMiniBTMutation = useMutation<
    AxiosResponse<RequestMiniBacktestingOutput>,
    AxiosError,
    RequestMiniBacktestingInput
  >(
    ['requestMiniBacktesting'],
    (body) => {
      return backtestApi.POST.requestMiniBackTest(body);
    },
    {
      onSuccess: () => {},
    },
  );

  return { reqMiniBTMutation };
};

export default useMiniBacktest;
