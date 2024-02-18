export type StandardVigenereEncryptDto = {
  plainText: string;
  key: string;
};
export type StandardVigenereDecryptDto = {
  cipherText: string;
  key: string;
};

export type AffineEncryptDto = {
  plainText: string;
  key: {
    m: number;
    b: number;
  };
};
export type AffineDecryptDto = {
  cipherText: string;
  key: {
    m: number;
    b: number;
  };
};

export type HillEncryptDto = {
  plainText: string;
  key: number[][];
};

export type HillDecryptDto = {
  cipherText: string;
  key: number[][];
};

export type AutoKeyVigenereEncryptDto = StandardVigenereEncryptDto;
export type AutoKeyVigenereDecryptDto = StandardVigenereDecryptDto;

export type ExtendedVigenereEncryptDto = StandardVigenereEncryptDto;
export type ExtendedVigenereDecryptDto = StandardVigenereDecryptDto;

export type PlayfairEncryptDto = StandardVigenereEncryptDto;
export type PlayfairDecryptDto = StandardVigenereDecryptDto;
