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

  public divideStringByN = (text: string, n: number) => {
    const strings: string[] = [];

    let i = 0;
    let stringToAdd = "";
    while (i < text.length) {
      if (stringToAdd.length < n) {
        stringToAdd += text[i];
      }

      if (stringToAdd.length === n) {
        strings.push(stringToAdd);
        stringToAdd = "";
      }

      i++;
    }

    if (stringToAdd !== "") {
      while (stringToAdd.length < n) {
        stringToAdd += "X";
      }
      strings.push(stringToAdd);
    }

    return strings;
  };
}
