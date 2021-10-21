import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { backtestApi } from 'states/api';
import {
  RequestMiniBacktestingInput,
  RequestMiniBacktestingOutput,
} from 'states/backtest/interface/dtos';
import { Corporation } from 'states/finance/interface/entities';
import { BaseTradingStrategy } from 'states/trading/interface/entities';

export const miniBacktestAdaptor = (currentUniversal: {
  selectedCorporations: Corporation;
  selectedTechnical: BaseTradingStrategy;
}): RequestMiniBacktestingInput => {
  const { selectedCorporations, selectedTechnical } = currentUniversal;
  let setting = new Array<number>();

  if (selectedTechnical?.setting_json) {
    const settingJSON = selectedTechnical.setting_json as Record<
      string,
      Record<string, number>
    >;
    // Object는 index 시그니처가 없어서 순회불가
    for (let key in settingJSON) {
      const obj = settingJSON[key];
      setting = setting.concat(Object.values(obj));
    }
  }

  if (selectedTechnical?.trading_strategy_name) {
    return {
      ticker: selectedCorporations.ticker,
      salestrategy: selectedTechnical?.trading_strategy_name,
      setting,
      data: {
        startTime: '20190101',
        endTime: '',
      },
    };
  } else {
    throw new Error('currentUniversal trading_strategy_name needeed');
  }
};

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
      onSuccess: (data) => {
        console.log('requestMiniBackTest success', data);
      },
    },
  );

  return { reqMiniBTMutation };
};

export default useMiniBacktest;
