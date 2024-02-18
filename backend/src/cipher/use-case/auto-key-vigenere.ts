import { subtractCharacterByKey } from "../../util/alphabetic-cipher";
import {
  AutoKeyVigenereEncryptDto,
  AutoKeyVigenereDecryptDto,
} from "../input-dto";
import { AutoKeyVigenereIOBoundary } from "../io-boundary";
import { StandardVigenereUseCase } from "./standard-vigenere";

/**
 * Warning: This class can only perform when given texts with alphabet A-Z only.
 */
export class AutoKeyVigenereUseCase implements AutoKeyVigenereIOBoundary {
  private standardVigenereUseCase: StandardVigenereUseCase;

  constructor() {
    this.standardVigenereUseCase = new StandardVigenereUseCase();
  }

  public encrypt = ({ plainText, key }: AutoKeyVigenereEncryptDto) => {
    return this.standardVigenereUseCase.encrypt({
      plainText,
      key: this.generateAutoKeyForEncryption(plainText, key),
    });
  };

  public decrypt = ({ cipherText, key }: AutoKeyVigenereDecryptDto) => {
    return this.standardVigenereUseCase.decrypt({
      cipherText,
      key: this.generateAutoKeyForDecryption(cipherText, key),
    });
  };

  public generateAutoKeyForEncryption = (text: string, key: string) => {
    const newKey = [];

    for (const char of key) {
      newKey.push(char.toUpperCase());
    }

    let i = 0;
    while (newKey.length < text.length) {
      newKey.push(text[i].toUpperCase());
      i++;
    }

    return newKey.join("");
  };

  public generateAutoKeyForDecryption = (text: string, key: string) => {
    const newKey = [];

    for (const char of key) {
      newKey.push(char.toUpperCase());
    }

    let i = 0;
    while (newKey.length < text.length) {
      newKey.push(
        subtractCharacterByKey(text[i].toUpperCase(), newKey[i].toUpperCase())
      );
      i++;
    }

    return newKey.join("");
  };
}
