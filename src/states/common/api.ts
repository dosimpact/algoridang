import axios from "axios";
import { getLocalMemberInfo } from "states/local-state";
import { loginMemberInfo, meOutput } from "./dtos";

// base setttings ,  interceptors

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URI;

// jwt 토큰
axios.interceptors.request.use(async (config) => {
  if (!config.headers["x-jwt"]) {
    config.headers["x-jwt"] = getLocalMemberInfo()?.token;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

// (1) member api

export const memberApi = {
  GET: {
    me: async () => (await axios.get("member/me")).data as meOutput,
  },
  POST: {
    loginMemberInfo: async () =>
      (await axios.get("member/me")).data as loginMemberInfo,
  },
  PATCH: {},
  DELETE: {},
};

// (2) strategy api
