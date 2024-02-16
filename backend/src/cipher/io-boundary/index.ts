import {
  AutoKeyVigenereDecryptDto,
  AutoKeyVigenereEncryptDto,
  StandardVigenereDecryptDto,
  StandardVigenereEncryptDto,
} from "../input-dto";

export interface StandardVigenereIOBoundary {
  encrypt: (inputDto: StandardVigenereEncryptDto) => string;
  decrypt: (inputDto: StandardVigenereDecryptDto) => string;
}

export interface AutoKeyVigenereIOBoundary {
  encrypt: (inputDto: AutoKeyVigenereEncryptDto) => string;
  decrypt: (inputDto: AutoKeyVigenereDecryptDto) => string;
}
