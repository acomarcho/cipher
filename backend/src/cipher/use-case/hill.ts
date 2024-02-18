import { HillDecryptDto, HillEncryptDto } from "../input-dto";
import { HillIOBoundary } from "../io-boundary";

export class HillUseCase implements HillIOBoundary {
  public encrypt = ({ plainText, key }: HillEncryptDto) => {
    return {
      text: "",
      base64: "",
    };
  };

  public decrypt = ({ cipherText, key }: HillDecryptDto) => {
    return {
      text: "",
      base64: "",
    };
  };
}
