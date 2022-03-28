export const capLetters = (text: string) => {
  const newText = text
    .split(/\s/)
    .reduce(
      (response, word) =>
        response.length < 2 ? (response += word.slice(0, 1)) : (response += ""),
      ""
    )
    .toUpperCase();
  return newText;
};
