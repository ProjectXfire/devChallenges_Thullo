import cookie from "cookie";
import { GetServerSidePropsContext } from "next";

export const parseCookies = (ctx: GetServerSidePropsContext): string | null => {
  const cookieParsed = cookie.parse(
    ctx.req ? ctx.req.headers.cookie || "" : document.cookie
  );
  if (
    Object.keys(cookieParsed).length === 0 &&
    cookieParsed.constructor === Object
  ) {
    return null;
  }
  if (cookieParsed.user) {
    return cookieParsed.user;
  } else {
    return null;
  }
};
