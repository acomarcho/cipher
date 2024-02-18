import {
  addCharacterByKey,
  subtractCharacterByKey,
} from "../../util/alphabetic-cipher";
import {
  StandardVigenereEncryptDto,
  StandardVigenereDecryptDto,
} from "../input-dto";
import { StandardVigenereIOBoundary } from "../io-boundary";

/**
 * Warning: This class can only perform when given texts with alphabet A-Z only.
 */
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

    const result = cipherText.join("").toUpperCase();

    return {
      text: result,
      base64: btoa(result),
    };
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

    const result = plainText.join("").toUpperCase();

    return {
      text: result,
      base64: btoa(result),
    };
  };
}
