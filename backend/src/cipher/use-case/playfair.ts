import { modulo } from "../../util/modulo";
import { PlayfairDecryptDto, PlayfairEncryptDto } from "../input-dto";
import { PlayfairIOBoundary } from "../io-boundary";

/**
 * Warning: This class can only perform when given texts with alphabet A-Z only.
 */
export class PlayfairUseCase implements PlayfairIOBoundary {
  public encrypt = ({ plainText, key }: PlayfairEncryptDto) => {
    const { matrix, hashMap } = this.generateKeyMatrix(key);
    const bigrams = this.generateBigramsFromText(plainText);

    const cipherText: string[] = [];

    bigrams.forEach((bigram) => {
      const firstCharLocation = hashMap[bigram[0]];
      const secondCharLocation = hashMap[bigram[1]];

      if (firstCharLocation.row === secondCharLocation.row) {
        return cipherText.push(
          matrix[firstCharLocation.row][modulo(firstCharLocation.col + 1, 5)] +
            matrix[secondCharLocation.row][
              modulo(secondCharLocation.col + 1, 5)
            ]
        );
      }

      if (firstCharLocation.col === secondCharLocation.col) {
        return cipherText.push(
          matrix[modulo(firstCharLocation.row + 1, 5)][firstCharLocation.col] +
            matrix[modulo(secondCharLocation.row + 1, 5)][
              secondCharLocation.col
            ]
        );
      }

      return cipherText.push(
        matrix[firstCharLocation.row][secondCharLocation.col] +
          matrix[secondCharLocation.row][firstCharLocation.col]
      );
    });

    const result = cipherText.join("");

    return {
      text: result,
      base64: btoa(result),
    };
  };

  public decrypt = ({ cipherText, key }: PlayfairDecryptDto) => {
    const { matrix, hashMap } = this.generateKeyMatrix(key);
    const bigrams = this.generateBigramsFromText(cipherText);

    const plainText: string[] = [];

    bigrams.forEach((bigram) => {
      const firstCharLocation = hashMap[bigram[0]];
      const secondCharLocation = hashMap[bigram[1]];

      if (firstCharLocation.row === secondCharLocation.row) {
        return plainText.push(
          matrix[firstCharLocation.row][modulo(firstCharLocation.col - 1, 5)] +
            matrix[secondCharLocation.row][
              modulo(secondCharLocation.col - 1, 5)
            ]
        );
      }

      if (firstCharLocation.col === secondCharLocation.col) {
        return plainText.push(
          matrix[modulo(firstCharLocation.row - 1, 5)][firstCharLocation.col] +
            matrix[modulo(secondCharLocation.row - 1, 5)][
              secondCharLocation.col
            ]
        );
      }

      return plainText.push(
        matrix[firstCharLocation.row][secondCharLocation.col] +
          matrix[secondCharLocation.row][firstCharLocation.col]
      );
    });

    const result = plainText.join("");

    return {
      text: result,
      base64: btoa(result),
    };
  };

  public generateKeyMatrix = (key: string) => {
    const matrix: string[][] = [];
    const hashMap: { [key: string]: { row: number; col: number } } = {};

    const uniqueChars = Array.from(new Set(key.toUpperCase())).filter(
      (char) =>
        char !== "J" ||
        !(
          "A".charCodeAt(0) <= char.charCodeAt(0) &&
          char.charCodeAt(0) <= "Z".charCodeAt(0)
        )
    );

    let alphabetToAdd = "A";
    while (uniqueChars.length < 25) {
      while (uniqueChars.includes(alphabetToAdd) || alphabetToAdd === "J") {
        alphabetToAdd = String.fromCharCode(alphabetToAdd.charCodeAt(0) + 1);
      }

      uniqueChars.push(alphabetToAdd);
    }

    for (let i = 0; i < 5; i++) {
      matrix[i] = [];
      for (let j = 0; j < 5; j++) {
        const char = uniqueChars[i * 5 + j];
        matrix[i][j] = char;
        hashMap[char] = {
          row: i,
          col: j,
        };
      }
    }

    return {
      matrix,
      hashMap,
    };
  };

  public generateBigramsFromText = (text: string) => {
    const bigrams: string[] = [];
    const textWithoutJ = text.toUpperCase().replace(/J/g, "I");

    for (let i = 0; i < textWithoutJ.length; i += 2) {
      const isLastCharacterWhenLengthIsOdd = i == textWithoutJ.length - 1;
      if (isLastCharacterWhenLengthIsOdd) {
        bigrams.push(text[i] + "X");
      } else {
        if (text[i] === text[i + 1]) {
          bigrams.push(text[i] + "X");
          i -= 1; // Shift i by one to accommodate the next + 2
        } else {
          bigrams.push(text[i] + text[i + 1]);
        }
      }
    }

    return bigrams;
  };
}
