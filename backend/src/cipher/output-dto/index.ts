export type CipherResult = {
  base64: string;
};

export type CipherResultWithText = CipherResult & {
  text: string;
};
