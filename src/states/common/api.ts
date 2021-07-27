import axios from "axios";
import { getLocalMemberInfo } from "states/local-state";
import { meOutput, loginMemberInfoInput, loginMemberInfoOutput } from "./dtos";

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
    me: async () => (await axios.get("member/me")).data as meOutput,
  },
  POST: {
    loginMemberInfo: async (body: loginMemberInfoInput) =>
      axios.post("member/login-member-info", body),
  },
  PATCH: {},
  DELETE: {},
};

// (2) strategy api
