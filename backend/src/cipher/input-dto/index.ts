export type StandardVigenereEncryptDto = {
  plainText: string;
  key: string;
};
export type StandardVigenereDecryptDto = {
  cipherText: string;
  key: string;
};

export type AutoKeyVigenereEncryptDto = StandardVigenereEncryptDto;
export type AutoKeyVigenereDecryptDto = StandardVigenereDecryptDto;
