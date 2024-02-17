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

export type ExtendedVigenereEncryptDto = StandardVigenereEncryptDto;
export type ExtendedVigenereDecryptDto = StandardVigenereDecryptDto;

export type PlayfairEncryptDto = StandardVigenereEncryptDto;
export type PlayfairDecryptDto = StandardVigenereDecryptDto;

export type AffineEncryptDto = StandardVigenereEncryptDto;
export type AffineDecryptDto = StandardVigenereDecryptDto;
