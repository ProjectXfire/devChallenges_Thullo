import axios from "axios";
// Services
import { handleErrorMessage } from "@services/error";
import { setToken } from "@services/token";
import apiReq from "@services/interceptors/apiThullo";

interface IAccessToken {
  access_token: string;
}

interface ILoginDto {
  email: string;
  password: string;
}

export const loginReq = async (data: ILoginDto) => {
  try {
    const response = await apiReq(null).post<IAccessToken>(`/auth/login`, data);
    setToken(response.data.access_token);
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
