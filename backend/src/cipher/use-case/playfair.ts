import { PlayfairDecryptDto, PlayfairEncryptDto } from "../input-dto";
import { PlayfairIOBoundary } from "../io-boundary";

export class PlayfairUseCase implements PlayfairIOBoundary {
  public encrypt = ({ plainText, key }: PlayfairEncryptDto) => {
    return {
      text: plainText,
      base64: plainText,
    };
  };

  public decrypt = ({ cipherText, key }: PlayfairDecryptDto) => {
    return {
      text: cipherText,
      base64: cipherText,
    };
  };

  public generateKeyMatrix = (key: string) => {
    const matrix: string[][] = [];

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
        matrix[i][j] = uniqueChars[i * 5 + j];
      }
    }

    return matrix;
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
