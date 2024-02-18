import { adjoint } from "../../util/matrix/matrix";
import { modulo, moduloInverse } from "../../util/modulo";
import { HillDecryptDto, HillEncryptDto } from "../input-dto";
import { HillIOBoundary } from "../io-boundary";
import { multiply, det } from "mathjs";

/**
 * Warning: This class can only perform when given texts with alphabet A-Z only.
 */
export class HillUseCase implements HillIOBoundary {
  private ALPHABET_LENGTH = 26;

  public encrypt = ({ plainText, key }: HillEncryptDto) => {
    const resultStrings: string[] = [];

    const nGrams = this.generateNGramsFromText(plainText, key[0].length);
    nGrams.forEach((nGram) => {
      let resultMatrix = multiply(key, this.convertNGramsToArray(nGram));
      resultMatrix = resultMatrix.map((ordinalNumber) => {
        return modulo(ordinalNumber, 26) + "A".charCodeAt(0);
      });

      const resultString: string[] = [];
      resultMatrix.forEach((ordinalNumber) => {
        resultString.push(String.fromCharCode(ordinalNumber));
      });

      resultStrings.push(resultString.join(""));
    });

    const result = resultStrings.join("");
    return {
      text: result,
      base64: btoa(result),
    };
  };

  public decrypt = ({ cipherText, key }: HillDecryptDto) => {
    const resultStrings: string[] = [];

    const determinant = det(key);
    const adjointMatrix = adjoint(key);

    const inverseKey = adjointMatrix.map((row) =>
      row.map((entry) => {
        const valueToModulo: number =
          moduloInverse(determinant, this.ALPHABET_LENGTH) *
          modulo(entry, this.ALPHABET_LENGTH);

        return modulo(valueToModulo, 26);
      })
    );

    const nGrams = this.generateNGramsFromText(cipherText, key[0].length);
    nGrams.forEach((nGram) => {
      let resultMatrix = multiply(inverseKey, this.convertNGramsToArray(nGram));
      resultMatrix = resultMatrix.map((ordinalNumber) => {
        return modulo(ordinalNumber, 26) + "A".charCodeAt(0);
      });

      const resultString: string[] = [];
      resultMatrix.forEach((ordinalNumber) => {
        resultString.push(String.fromCharCode(ordinalNumber));
      });

      resultStrings.push(resultString.join(""));
    });

    const result = resultStrings.join("");
    return {
      text: result,
      base64: btoa(result),
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

  public convertNGramsToArray = (nGrams: string) => {
    return Array.from(nGrams).map(
      (character) => character.charCodeAt(0) - "A".charCodeAt(0)
    );
  };
}
