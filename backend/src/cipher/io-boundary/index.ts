import {
  StandardVigenereDecryptDto,
  StandardVigenereEncryptDto,
} from "../input-dto";

export interface StandardVigenereIOBoundary {
  encrypt: (inputDto: StandardVigenereEncryptDto) => string;
  decrypt: (inputDto: StandardVigenereDecryptDto) => string;
}
