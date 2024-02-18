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

export type TranspositionEncryptDto = {
  plainText: string;
  key: number;
};
export type TranspositionDecryptDto = {
  cipherText: string;
  key: number;
};

export type SuperEncryptDto = {
  plainText: string;
  key: {
    vigenere: string;
    transposition: number;
  };
};
export type SuperDecryptDto = {
  cipherText: string;
  key: {
    vigenere: string;
    transposition: number;
  };
};
