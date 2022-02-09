import axios from "axios";
// Services
import { handleErrorMessage } from "@services/error";
import { setToken } from "@services/token";

interface IAccessToken {
  access_token: string;
}

interface ILoginDto {
  email: string;
  password: string;
}

export const loginReq = async (baseURL: string, data: ILoginDto) => {
  try {
    const response = await axios.post<IAccessToken>(
      `${baseURL}/auth/login`,
      data
    );
    setToken(response.data.access_token);
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
