export const capLetters = (text: string) => {
  const newText = text
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), "")
    .toUpperCase();
  return newText;
};
