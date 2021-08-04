import axios from "axios";
import { getLocalMemberInfo } from "states/local-state";
import {
  GetCorporationInput,
  GetCorporationsWithTermInput,
  GetDayilStocksInput,
} from "./interface/finance/dtos";
import { loginMemberInfoInput } from "./interface/member/dtos";
import { CreateMyStrategyInput } from "./interface/strategy/dtos";

// base setttings ,  interceptors

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URI;

// jwt 토큰
axios.interceptors.request.use(async (config) => {
  if (!config.headers["x-jwt"] && getLocalMemberInfo()?.token) {
    config.headers["x-jwt"] = getLocalMemberInfo()?.token;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

// (1) member api

export const memberApi = {
  GET: {
    me: () => axios.get("member/me"),
  },
  POST: {
    loginMemberInfo: (body: loginMemberInfoInput) =>
      axios.post("member/login-member-info", body),
  },
  PATCH: {},
  DELETE: {},
};

// (2) strategy api

export const strategyApi = {
  GET: {
    getStrategyListNew: () => {
      return axios.get("strategy/new");
    },
    getStrategyListHighView: () => {
      return axios.get("strategy/high_view");
    },
    getStrategyListType: () => {
      return axios.get("strategy/type");
    },
    getStrategyById: (strategy_code: string) => {
      return axios.get(`strategy/strategy/${strategy_code}`);
    },
    getMyStrategyList: () => {
      return axios.get("strategy/strategy/my");
    },
    getMyStrategyById: (strategy_code: string) => {
      return axios.get(`strategy/strategy/my/${strategy_code}`);
    },
  },
  POST: {
    createMyStrategy: (body: CreateMyStrategyInput) => {
      return axios.post(`strategy/strategy/my/`, body);
    },
  },
  PATCH: {},
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
