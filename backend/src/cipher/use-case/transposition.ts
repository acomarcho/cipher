import { TranspositionDecryptDto, TranspositionEncryptDto } from "../input-dto";
import { TranspositionIOBoundary } from "../io-boundary";

export class TranspositionUseCase implements TranspositionIOBoundary {
  public encrypt = ({ plainText, key }: TranspositionEncryptDto) => {
    const dividedStrings = this.divideStringByN(plainText, key);
    const transposedMatrix = this.transposeDividedStrings(dividedStrings);

    let result = "";
    transposedMatrix.forEach((row) => {
      row.forEach((entry) => {
        result += entry;
      });
    });

    return {
      text: result,
      base64: btoa(result),
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

  public transposeDividedStrings = (dividedStrings: string[]) => {
    const stringsInMatrixForm = dividedStrings.map((str) => Array.from(str));

    function transpose(matrix: string[][]) {
      const rows = matrix.length;
      const cols = matrix[0].length;

      const transposedMatrix = Array.from({ length: cols }, () =>
        Array.from({ length: rows }, () => "")
      );

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          transposedMatrix[i][j] = matrix[j][i];
        }
      }

      return transposedMatrix;
    }

    return transpose(stringsInMatrixForm);
  };
}
