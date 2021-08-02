import axios from "axios";
import { getLocalMemberInfo } from "states/local-state";
import { GetDayilStocksInput } from "./interface/finance/dtos";
import { loginMemberInfoInput } from "./interface/member/dtos";
import { GetStrategyListNewOutput } from "./interface/strategy/dtos";

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
      return axios.get("strategy/getStrategyListNew");
    },
    getStrategyListHighView: () => {
      return axios.get("strategy/getStrategyListHighView");
    },
    getStrategyListType: () => {
      return axios.get("strategy/getStrategyListType");
    },
    getStrategyById: (strategy_code: string) => {
      return axios.get(`strategy/getStrategyById/${strategy_code}`);
    },
    getMyStrategyList: () => {
      return axios.get("strategy/getMyStrategyList");
    },
    getMyStrategyById: (strategy_code: string) => {
      return axios.get(`strategy/getMyStrategyById/${strategy_code}`);
    },
  },
  POST: {},
  PATCH: {},
  DELETE: {},
};

// (3) finance api
export const financeApi = {
  GET: {
    dailystock: ({ term, skip, take, sort }: GetDayilStocksInput) => {
      return axios.get(`finance/dailystock/${term}`, {
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
