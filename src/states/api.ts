import axios from 'axios';
import { getLocalMemberInfo } from 'states/local-state';
import { PushBackTestQInput } from './interface/backtest/entities';
import {
  GetCorporationInput,
  GetCorporationsWithTermInput,
  GetDayilStocksInput,
} from './interface/finance/dtos';
import { LoginMemberInfoInput } from './interface/member/dtos';
import {
  CreateMyStrategyInput,
  ForkStrategyInput,
  UpdateMyStrategyByIdInput,
} from './interface/strategy/dtos';
import { AddUniversalInput } from './interface/trading/dtos';

// base setttings ,  interceptors

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URI;

// jwt 토큰
axios.interceptors.request.use(async (config) => {
  if (!config.headers['x-jwt'] && getLocalMemberInfo()?.token) {
    config.headers['x-jwt'] = getLocalMemberInfo()?.token;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

// (1) member api

export const memberApi = {
  GET: {
    me: () => axios.get('member/me'),
  },
  POST: {
    loginMemberInfo: (body: LoginMemberInfoInput) =>
      axios.post('member/loginMemberInfo', body),
  },
  PATCH: {},
  DELETE: {},
};

// (2) strategy api
export const strategyApi = {
  GET: {
    getStrategyListNew: () => {
      return axios.get('strategies?type=new');
    },
    getStrategyListHighView: () => {
      return axios.get('strategies?type=high-view');
    },
    getStrategyListType: () => {
      return axios.get('strategies/invest-type');
    },
    getStrategyById: (strategy_code: string) => {
      return axios.get(`strategies/${strategy_code}`);
    },
    getMyStrategyList: () => {
      return axios.get('strategies/my');
    },
    getMyStrategyById: (strategy_code: string) => {
      return axios.get(`strategies/my/${strategy_code}`);
    },
  },
  POST: {
    createMyStrategy: (body: CreateMyStrategyInput) => {
      return axios.post(`strategies/my`, body);
    },
    addUniversal: (strategy_code: string, body: AddUniversalInput) => {
      return axios.post(`strategies/my/${strategy_code}/universal`, body);
    },
    forkStrategy: (body: ForkStrategyInput) => {
      return axios.post(`strategies/fork`, body);
    },
  },
  PUT: {},
  PATCH: {
    updateMyStrategy: (body: UpdateMyStrategyByIdInput) => {
      return axios.patch(`strategies/my`, body);
    },
  },
  DELETE: {},
};

// (3) finance api
export const financeApi = {
  GET: {
    getCorporations: () => axios.get(`finance/corporations`),
    getCorporationsWithTerm: ({ term }: GetCorporationsWithTermInput) =>
      axios.get(`finance/corporations/${term}`),
    getCorporation: ({ term }: GetCorporationInput) =>
      axios.get(`finance/corporation/${term}`),
    //
    getDailyStocks: ({ term, skip, take, sort }: GetDayilStocksInput) => {
      return axios.get(`finance/dailystocks/${term}`, {
        params: {
          skip,
          take,
          sort,
        },
      });
    },
  },
  POST: {},
  PATCH: {},
  DELETE: {},
};

// (4) trading api

export const tradingApi = {
  GET: {
    getBaseTradingStrategy: () => axios.get(`trading/technicals/1`),
    getBaseTradingStrategyList: () => axios.get(`trading/technicals`),
    // TODO (will deprecated) 필터 리스트 가져 오기
    __mockGetFilterFactorList: () => axios.get(`trading/filters`),
  },
  POST: {
    // TODO (will deprecated) 필터 적용 결과 , 기업 리스트 반환
    __mockGetFilterReulstList: () => axios.post(`trading/filters`),
    // TODO (will deprecated) 빠른 백테스팅 기능
    __mockRequestMiniBacktesting: (
      ticker: string,
      body?: { trading_strategy_name: string },
    ) => axios.post(`trading/mini-backtests/${ticker}`, body),
  },
  PATCH: {},
  DELETE: {},
};

// (5) backtest api

export const backtestApi = {
  GET: {
    getHistories: (strategy_code: string) => {
      return axios.get(`backtests/${strategy_code}/histories`);
    },
    getAccumulateProfitRate: (strategy_code: string) => {
      return axios.get(`backtests/${strategy_code}/accumulate-profit-rate`);
    },
    getMontlyProfitRate: (strategy_code: string) => {
      return axios.get(`backtests/${strategy_code}/montly-profit-rate`);
    },
    getDailyProfitRate: (strategy_code: string) => {
      return axios.get(`backtests/${strategy_code}/daily-profit-rate`);
    },
    getWinRatio: (strategy_code: string) => {
      return axios.get(`backtests/${strategy_code}/win-ratio`);
    },
  },
  POST: {
    pushBackTestQ: (body: PushBackTestQInput) => {
      return axios.post(`backtests/backtest-q`, body);
    },
  },
  PATCH: {},
  DELETE: {},
};
