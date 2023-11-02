import { api, Header } from "./index";

type sendAccountContent = {
  id: string;
  email: string;
  socialType: string;
}

type sendUserInfoContent = {
  nickname: string;
  region: string;
}

export const loginFtn = async (data: sendAccountContent) => {
  return await api.post("/user/login", data);
}

export const setUserInfoFtn = async (data: sendUserInfoContent) => {
  return await api.put("/user/info", data, await Header())
}