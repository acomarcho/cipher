import { modulo } from "../../util/modulo";
import {
  StandardVigenereDecryptDto,
  StandardVigenereEncryptDto,
} from "../input-dto";
import { StandardVigenereIOBoundary } from "../io-boundary";

export class StandardVigenereUseCase implements StandardVigenereIOBoundary {
  private lowercaseAlphabets;
  private uppercaseAlphabets;

  constructor() {
    this.lowercaseAlphabets = "abcdefghijklmnopqrstuvwxyz";
    this.uppercaseAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  public encrypt = ({ plainText, key }: StandardVigenereEncryptDto) => {
    const cipherText: string[] = [];

    for (let i = 0; i < plainText.length; i++) {
      const encryptedText = this.addCharacterByKey(
        plainText[i],
        key[i % key.length]
      );

      cipherText.push(encryptedText);
    }

    return cipherText.join("").toUpperCase();
  };

  public decrypt = ({ cipherText, key }: StandardVigenereDecryptDto) => {
    const plainText: string[] = [];

    for (let i = 0; i < cipherText.length; i++) {
      const decryptedKey = this.subtractCharacterByKey(
        plainText[i],
        key[i % key.length]
      );

      plainText.push(decryptedKey);
    }

    return plainText.join("").toUpperCase();
  };

  public isLowercaseAlphabet = (character: string): boolean => {
    return this.lowercaseAlphabets.includes(character);
  };

  public isUppercaseAlphabet = (character: string): boolean => {
    return this.uppercaseAlphabets.includes(character);
  };

  public addCharacterByKey = (character: string, key: string): string => {
    const keyInLowercase = key.toLowerCase();
    const keyIndex = this.lowercaseAlphabets.indexOf(keyInLowercase);

    const characterInLowercase = character.toLowerCase();
    const characterIndex =
      this.lowercaseAlphabets.indexOf(characterInLowercase);

    if (this.isLowercaseAlphabet(character)) {
      return this.lowercaseAlphabets[
        modulo(characterIndex + (keyIndex + 1), 26)
      ];
    }

    return this.uppercaseAlphabets[modulo(characterIndex + (keyIndex + 1), 26)];
  };

  public subtractCharacterByKey = (character: string, key: string): string => {
    const keyInLowercase = key.toLowerCase();
    const keyIndex = this.lowercaseAlphabets.indexOf(keyInLowercase);

    const characterInLowercase = character.toLowerCase();
    const characterIndex =
      this.lowercaseAlphabets.indexOf(characterInLowercase);

    if (this.isLowercaseAlphabet(character)) {
      return this.lowercaseAlphabets[
        modulo(characterIndex - (keyIndex + 1), 26)
      ];
    }

    return this.uppercaseAlphabets[modulo(characterIndex - (keyIndex + 1), 26)];
  };
}
