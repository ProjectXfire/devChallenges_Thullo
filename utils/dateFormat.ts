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

export const formattingDate = (date: string) => {
  const setDate = new Date(date);
  const day = setDate.getUTCDate();
  const fullYear = setDate.getFullYear();
  const month = months[setDate.getMonth()];
  return `on ${day} ${month}, ${fullYear}`;
};

export const formattingDate2 = (date: string) => {
  const setDate = new Date(date);
  const day = setDate.getUTCDate();
  const month = months[setDate.getMonth()];
  const hours = setDate.getUTCHours();
  const minutes = setDate.getUTCMinutes();
  return `${day} ${month} at ${hours}:${minutes}`;
};

export const formattingDate3 = (date: string) => {
  const setDate = new Date(date);
  const day = setDate.getUTCDate();
  const fullYear = setDate.getFullYear();
  const month = months[setDate.getMonth()];
  return `Added ${month} ${day}, ${fullYear}`;
};
