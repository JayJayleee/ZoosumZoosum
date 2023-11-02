import { api, Header } from "./index";

type sendAccountContent = {
  id: string;
  email: string;
  socialType: string;
}

export const loginFtn = async (data: sendAccountContent) => {
  return await api.post("/user/login", data);
}