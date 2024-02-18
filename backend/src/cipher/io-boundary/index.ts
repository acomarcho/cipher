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
} from "../input-dto";
import { CipherResult, CipherResultWithText } from "../output-dto";

export interface StandardVigenereIOBoundary {
  encrypt: (inputDto: StandardVigenereEncryptDto) => CipherResultWithText;
  decrypt: (inputDto: StandardVigenereDecryptDto) => CipherResultWithText;
}

export interface AutoKeyVigenereIOBoundary {
  encrypt: (inputDto: AutoKeyVigenereEncryptDto) => CipherResultWithText;
  decrypt: (inputDto: AutoKeyVigenereDecryptDto) => CipherResultWithText;
}

export interface ExtendedVigenereIOBoundary {
  encrypt: (inputDto: ExtendedVigenereEncryptDto) => CipherResult;
  decrypt: (inputDto: ExtendedVigenereDecryptDto) => CipherResult;
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
