export const expireCookieDate = (): Date => {
  const getDate: Date = new Date();
  getDate.setMinutes(getDate.getMinutes() + 60);
  return getDate;
};
