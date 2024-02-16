import {
  addCharacterByKey,
  subtractCharacterByKey,
} from "../../util/extended-cipher";
import {
  ExtendedVigenereDecryptDto,
  ExtendedVigenereEncryptDto,
} from "../input-dto";
import { ExtendedVigenereIOBoundary } from "../io-boundary";

export class ExtendedVigenereUseCase implements ExtendedVigenereIOBoundary {
  public encrypt = ({ plainText, key }: ExtendedVigenereEncryptDto) => {
    const cipherText: string[] = [];

    for (let i = 0; i < plainText.length; i++) {
      const encryptedText = addCharacterByKey(
        plainText[i],
        key[i % key.length]
      );

      cipherText.push(encryptedText);
    }

    return {
      base64: btoa(cipherText.join("")),
    };
  };

  public decrypt = ({ cipherText, key }: ExtendedVigenereDecryptDto) => {
    const plainText: string[] = [];

    for (let i = 0; i < cipherText.length; i++) {
      const decryptedKey = subtractCharacterByKey(
        cipherText[i],
        key[i % key.length]
      );

      plainText.push(decryptedKey);
    }

    return {
      base64: btoa(plainText.join("")),
    };
  };
}
