import express from "express";
import { StandardVigenereUseCase } from "../use-case/standard-vigenere";
import { textEncryptRequestSchema, textDecryptRequestSchema } from "../request";
import status from "http-status";
import { ApiResponse } from "../response";
import { sanitizeInputAsAlphabetOnly } from "../../util/sanitizer";

export class StandardVigenereController {
  private standardVigenereUseCase;
  private router;

  constructor(standardVigenereUseCase: StandardVigenereUseCase) {
    this.standardVigenereUseCase = standardVigenereUseCase;
    this.router = express.Router();

    this.router.put("/standard-vigenere/encrypt/text", (req, res) => {
      try {
        const parsedRequest = textEncryptRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;
        const result = this.standardVigenereUseCase.encrypt({
          plainText: sanitizeInputAsAlphabetOnly(text),
          key: sanitizeInputAsAlphabetOnly(key),
        });

        return res.status(status.OK).json(new ApiResponse(result, null));
      } catch (error) {
        return res
          .status(status.INTERNAL_SERVER_ERROR)
          .json(new ApiResponse(null, error));
      }
    });

    this.router.put("/standard-vigenere/decrypt/text", (req, res) => {
      try {
        const parsedRequest = textDecryptRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;
        const result = this.standardVigenereUseCase.decrypt({
          cipherText: sanitizeInputAsAlphabetOnly(text),
          key: sanitizeInputAsAlphabetOnly(key),
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
