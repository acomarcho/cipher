import { SuperDecryptDto, SuperEncryptDto } from "../input-dto";
import { SuperIOBoundary } from "../io-boundary";
import { ExtendedVigenereUseCase } from "./extended-vigenere";
import { TranspositionUseCase } from "./transposition";

export class SuperUseCase implements SuperIOBoundary {
  private extendedVigenereUseCase;
  private transpositionUseCase;

  constructor() {
    this.extendedVigenereUseCase = new ExtendedVigenereUseCase();
    this.transpositionUseCase = new TranspositionUseCase();
  }

  public encrypt = ({ plainText, key }: SuperEncryptDto) => {
    const vigenereResult = this.extendedVigenereUseCase.encrypt({
      plainText,
      key: key.vigenere,
    });

    const transpositionResult = this.transpositionUseCase.encrypt({
      plainText: vigenereResult.text,
      key: key.transposition,
    });

    return transpositionResult;
  };

  public decrypt = ({ cipherText, key }: SuperDecryptDto) => {
    const transpositionResult = this.transpositionUseCase.decrypt({
      cipherText,
      key: key.transposition,
    });

    const vigenereResult = this.extendedVigenereUseCase.decrypt({
      cipherText: transpositionResult.text,
      key: key.vigenere,
    });

    return vigenereResult;
  };
}
