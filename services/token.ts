import Cookies from "js-cookie";
import { expireCookieDate } from "@utils/setExpireCookie";

export const setToken = (value: String) => {
  Cookies.set("user", value, { expires: expireCookieDate(), path: "/" });
};

export const getToken = () => {
  const token = Cookies.get("user");
  return token;
};

export const removeToken = () => {
  Cookies.remove("user");
};
