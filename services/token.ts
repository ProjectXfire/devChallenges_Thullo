import Cookies from "js-cookie";
import { expireCookieDate } from "@utils/setExpireCookie";

//let time: NodeJS.Timer;

export const setToken = (value: String) => {
  Cookies.set("user", value, {
    expires: expireCookieDate(),
    path: "/",
    //secure: true,
  });
  const currentCookie = getToken();
  /*time = setInterval(() => {
    if (currentCookie !== getToken()) {
      clearInterval(time);
      window.location.reload();
    }
  }, 1000);*/
};

export const getToken = () => {
  const token = Cookies.get("user");
  return token;
};

export const removeToken = () => {
  Cookies.remove("user");
  //clearInterval(time);
};
