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

  public generateNGramsFromText = (text: string, n: number) => {
    const nGrams: string[] = [];

    for (let i = 0; i < text.length; i += n) {
      const shouldPadCharacters = i >= text.length - (n - 1);
      let stringToAdd = "";

      if (shouldPadCharacters) {
        for (let j = i; j < text.length; j++) {
          stringToAdd += text[j];
        }

        while (stringToAdd.length < n) {
          stringToAdd += "X";
        }

        nGrams.push(stringToAdd);
      } else {
        let j = i;
        while (stringToAdd.length < n) {
          stringToAdd += text[j];
          j++;
        }
        nGrams.push(stringToAdd);
      }
    }

    return nGrams;
  };
}
