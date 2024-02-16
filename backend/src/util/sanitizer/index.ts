export const sanitizeInputAsAlphabetOnly = (inputString: string) => {
  return inputString.replace(/[^a-zA-Z]/g, "");
};
