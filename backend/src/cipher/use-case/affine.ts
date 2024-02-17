import { affineEncrypt } from "../../util/alphabetic-cipher";
import {
  AffineDecryptDto,
  AffineEncryptDto,
  PlayfairDecryptDto,
  PlayfairEncryptDto,
} from "../input-dto";
import { AffineIOBoundary, PlayfairIOBoundary } from "../io-boundary";

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
    // TODO: Implement decrypt
    return {
      text: "",
      base64: "",
    };
  };
}
