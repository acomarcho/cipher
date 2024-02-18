import {
  AffineDecryptDto,
  AffineEncryptDto,
  AutoKeyVigenereDecryptDto,
  AutoKeyVigenereEncryptDto,
  ExtendedVigenereDecryptDto,
  ExtendedVigenereEncryptDto,
  HillDecryptDto,
  HillEncryptDto,
  PlayfairDecryptDto,
  PlayfairEncryptDto,
  StandardVigenereDecryptDto,
  StandardVigenereEncryptDto,
  SuperDecryptDto,
  SuperEncryptDto,
  TranspositionDecryptDto,
  TranspositionEncryptDto,
} from "../input-dto";
import { CipherResultWithText } from "../output-dto";

export interface StandardVigenereIOBoundary {
  encrypt: (inputDto: StandardVigenereEncryptDto) => CipherResultWithText;
  decrypt: (inputDto: StandardVigenereDecryptDto) => CipherResultWithText;
}

export interface AutoKeyVigenereIOBoundary {
  encrypt: (inputDto: AutoKeyVigenereEncryptDto) => CipherResultWithText;
  decrypt: (inputDto: AutoKeyVigenereDecryptDto) => CipherResultWithText;
}

export interface ExtendedVigenereIOBoundary {
  encrypt: (inputDto: ExtendedVigenereEncryptDto) => CipherResultWithText;
  decrypt: (inputDto: ExtendedVigenereDecryptDto) => CipherResultWithText;
}

export interface PlayfairIOBoundary {
  encrypt: (inputDto: PlayfairEncryptDto) => CipherResultWithText;
  decrypt: (inputDto: PlayfairDecryptDto) => CipherResultWithText;
}

export interface AffineIOBoundary {
  encrypt: (inputDto: AffineEncryptDto) => CipherResultWithText;
  decrypt: (inputDto: AffineDecryptDto) => CipherResultWithText;
}

export interface HillIOBoundary {
  encrypt: (inputDto: HillEncryptDto) => CipherResultWithText;
  decrypt: (inputDto: HillDecryptDto) => CipherResultWithText;
}

export interface TranspositionIOBoundary {
  encrypt: (inputDto: TranspositionEncryptDto) => CipherResultWithText;
  decrypt: (inputDto: TranspositionDecryptDto) => CipherResultWithText;
}

export interface SuperIOBoundary {
  encrypt: (inputDto: SuperEncryptDto) => CipherResultWithText;
  decrypt: (inputDto: SuperDecryptDto) => CipherResultWithText;
}
