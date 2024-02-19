export const BE_URL = "http://localhost:3000";

export enum Cipher {
  StandardVigenere = "standard-vigenere",
  AutoKeyVigenere = "auto-key-vigenere",
  ExtendedVigenere = "extended-vigenere",
  Playfair = "playfair",
  Affine = "affine",
  Hill = "hill",
  Super = "super",
}

export const isCipher = (v: string): v is Cipher => {
  return (
    v === Cipher.Affine ||
    v === Cipher.AutoKeyVigenere ||
    v === Cipher.ExtendedVigenere ||
    v === Cipher.Hill ||
    v === Cipher.Playfair ||
    v === Cipher.StandardVigenere ||
    v === Cipher.Super
  );
};

export type TextKey = string;
export type AffineKey = {
  m: string;
  b: string;
};
export type HillKey = {
  matrixSize: string;
  matrix: string[][];
};
export type SuperKey = {
  vigenere: string;
  transposition: string;
};
export type CipherKey = TextKey | AffineKey | HillKey | SuperKey;

export const isTextKey = (_key: CipherKey, cipher: Cipher): _key is TextKey => {
  return (
    cipher === Cipher.AutoKeyVigenere ||
    cipher === Cipher.ExtendedVigenere ||
    cipher === Cipher.StandardVigenere ||
    cipher === Cipher.Playfair
  );
};
export const isAffineKey = (
  _key: CipherKey,
  cipher: Cipher
): _key is AffineKey => {
  return cipher === Cipher.Affine;
};
export const isHillKey = (_key: CipherKey, cipher: Cipher): _key is HillKey => {
  return cipher === Cipher.Hill;
};
export const isSuperKey = (
  _key: CipherKey,
  cipher: Cipher
): _key is SuperKey => {
  return cipher === Cipher.Super;
};

export enum InputType {
  Text = "text",
  File = "file",
}

export enum TextInputType {
  Text = "text",
  Base64 = "base64",
}

export type CipherForm = {
  cipher: Cipher;
  key: CipherKey;
  inputType: string;
  textInputType: string;
  textInput: string;
};

export enum PageStatus {
  None = "NONE",
  Loading = "LOADING",
}

export type CipherResult = {
  data: {
    text: string;
    base64: string;
  };
};

export type FileResult = {
  file: Buffer;
  fileName: string;
};
