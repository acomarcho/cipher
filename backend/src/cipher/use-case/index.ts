import {
  addCharacterByKey,
  subtractCharacterByKey,
} from "../../util/alphabetic-cipher";
import { modulo } from "../../util/modulo";
import {
  AutoKeyVigenereDecryptDto,
  AutoKeyVigenereEncryptDto,
  StandardVigenereDecryptDto,
  StandardVigenereEncryptDto,
} from "../input-dto";
import { StandardVigenereIOBoundary } from "../io-boundary";

export class StandardVigenereUseCase implements StandardVigenereIOBoundary {
  public encrypt = ({ plainText, key }: StandardVigenereEncryptDto) => {
    const cipherText: string[] = [];

    for (let i = 0; i < plainText.length; i++) {
      const encryptedText = addCharacterByKey(
        plainText[i].toUpperCase(),
        key[i % key.length].toUpperCase()
      );

      cipherText.push(encryptedText);
    }

    return cipherText.join("").toUpperCase();
  };

  public decrypt = ({ cipherText, key }: StandardVigenereDecryptDto) => {
    const plainText: string[] = [];

    for (let i = 0; i < cipherText.length; i++) {
      const decryptedKey = subtractCharacterByKey(
        cipherText[i].toUpperCase(),
        key[i % key.length].toUpperCase()
      );

      plainText.push(decryptedKey);
    }

    return plainText.join("").toUpperCase();
  };
}

export class AutoKeyVigenereUseCase {
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
