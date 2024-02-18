import { TranspositionDecryptDto, TranspositionEncryptDto } from "../input-dto";
import { TranspositionIOBoundary } from "../io-boundary";

export class TranspositionUseCase implements TranspositionIOBoundary {
  public encrypt = ({ plainText, key }: TranspositionEncryptDto) => {
    return {
      text: "",
      base64: "",
    };
  };

  public decrypt = ({ cipherText, key }: TranspositionDecryptDto) => {
    return {
      text: "",
      base64: "",
    };
  };
}
