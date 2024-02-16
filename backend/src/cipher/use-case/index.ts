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
    return "";
  };

  public decrypt = ({ cipherText, key }: StandardVigenereDecryptDto) => {
    return "";
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
      return this.lowercaseAlphabets[(characterIndex + (keyIndex + 1)) % 26];
    }

    return this.uppercaseAlphabets[(characterIndex + (keyIndex + 1)) % 26];
  };
}
