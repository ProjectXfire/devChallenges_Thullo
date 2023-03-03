import axios from "axios";
import { GetServerSidePropsContext } from "next";
// Services
import { getToken } from "@services/token";
// Utils
import { handleErrorMessage } from "@services/error";

export const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

const thulloApi = axios.create({ baseURL });

const apiReq = (tokenSSR: string | null) => {
  thulloApi.interceptors.request.use(async (config) => {
    try {
      let token = null;
      if (tokenSSR) {
        token = tokenSSR;
      } else {
        token = getToken();
      }

      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    } catch (error: any) {
      throw new Error(handleErrorMessage(error));
    }
  });
  return thulloApi;
};

export default apiReq;
