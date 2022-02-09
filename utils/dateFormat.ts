export const formattingDate = (date: string) => {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const setDate = new Date(date);
  const day = setDate.getUTCDate();
  const fullYear = setDate.getFullYear();
  const month = months[setDate.getMonth()];
  return `on ${day} ${month}, ${fullYear}`;
};
