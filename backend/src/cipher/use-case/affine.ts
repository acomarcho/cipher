import { affineDecrypt, affineEncrypt } from "../../util/alphabetic-cipher";
import {
  AffineDecryptDto,
  AffineEncryptDto
} from "../input-dto";
import { AffineIOBoundary } from "../io-boundary";

/**
 * Warning: This class can only perform when given texts with alphabet A-Z only.
 */
export class AffineUseCase implements AffineIOBoundary {
  public encrypt = ({ plainText, key }: AffineEncryptDto) => {
    const cipherText: string[] = [];

    for (const character of plainText) {
      cipherText.push(affineEncrypt(character[0].toUpperCase(), key));
    }

    const result = cipherText.join("");
    return {
      text: result,
      base64: btoa(result),
    };
  };

  public decrypt = ({ cipherText, key }: AffineDecryptDto) => {
    const plainText: string[] = [];

    for (const character of cipherText) {
      plainText.push(affineDecrypt(character[0].toUpperCase(), key));
    }

    const result = plainText.join("");
    return {
      text: result,
      base64: btoa(result),
    };
  };
}
