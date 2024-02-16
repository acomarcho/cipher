import { modulo } from "../modulo";

const MINIMUM_ORDINAL_NUMBER = "A".charCodeAt(0);
const ALPHABET_COUNT = 26;

export const addCharacterByKey = (character: string, key: string): string => {
  const characterNumber = character.charCodeAt(0) - MINIMUM_ORDINAL_NUMBER;
  const keyNumber = key.charCodeAt(0) - MINIMUM_ORDINAL_NUMBER;

  const newNumber =
    modulo(characterNumber + keyNumber, ALPHABET_COUNT) +
    MINIMUM_ORDINAL_NUMBER;

  return String.fromCharCode(newNumber);
};

export const subtractCharacterByKey = (
  character: string,
  key: string
): string => {
  const characterNumber = character.charCodeAt(0) - MINIMUM_ORDINAL_NUMBER;
  const keyNumber = key.charCodeAt(0) - MINIMUM_ORDINAL_NUMBER;

  const newNumber =
    modulo(characterNumber - keyNumber, ALPHABET_COUNT) +
    MINIMUM_ORDINAL_NUMBER;

  return String.fromCharCode(newNumber);
};
