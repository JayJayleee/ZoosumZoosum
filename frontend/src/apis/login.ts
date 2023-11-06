import { api, Header } from "./index";
import { sendAccountContent, sendNickname, sendUserInfoContent } from "@/types/login";

export const loginFtn = async (data: sendAccountContent) => {
  return await api.post("/user/login", data);
}

export const nicknameDuplicate = async (data: sendNickname) => {
  return await api.post("/user/duplicate", data, await Header());
}

export const setUserInfoFtn = async (data: sendUserInfoContent) => {
  return await api.put("/user/info", data, await Header());
}

export const logoutFtn = async () => {
  return await api.delete("/user/logout", await Header());
}