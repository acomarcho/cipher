import express from "express";
import status from "http-status";
import { sanitizeInputAsAlphabetOnly } from "../../util/sanitizer";
import { textEncryptRequestSchema, textDecryptRequestSchema } from "../request";
import { ApiResponse } from "../response";
import { AutoKeyVigenereUseCase } from "../use-case/auto-key-vigenere";

export class AutoKeyVigenereController {
  private autoKeyVigenereUseCase;
  private router;

  constructor(autoKeyVigenereUseCase: AutoKeyVigenereUseCase) {
    this.autoKeyVigenereUseCase = autoKeyVigenereUseCase;
    this.router = express.Router();

    this.router.put("/auto-key-vigenere/encrypt/text", (req, res) => {
      try {
        const parsedRequest = textEncryptRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;
        const result = this.autoKeyVigenereUseCase.encrypt({
          plainText: sanitizeInputAsAlphabetOnly(text).toUpperCase(),
          key: sanitizeInputAsAlphabetOnly(key).toUpperCase(),
        });

        return res.status(status.OK).json(new ApiResponse(result, null));
      } catch (error) {
        return res
          .status(status.INTERNAL_SERVER_ERROR)
          .json(new ApiResponse(null, error));
      }
    });

    this.router.put("/auto-key-vigenere/decrypt/text", (req, res) => {
      try {
        const parsedRequest = textDecryptRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;
        const result = this.autoKeyVigenereUseCase.decrypt({
          cipherText: sanitizeInputAsAlphabetOnly(text).toUpperCase(),
          key: sanitizeInputAsAlphabetOnly(key).toUpperCase(),
        });

        return res.status(status.OK).json(new ApiResponse(result, null));
      } catch (error) {
        return res
          .status(status.INTERNAL_SERVER_ERROR)
          .json(new ApiResponse(null, error));
      }
    });
  }

  public getRouter = () => {
    return this.router;
  };
}
