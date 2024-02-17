import express from "express";
import { textEncryptRequestSchema, textDecryptRequestSchema } from "../request";
import status from "http-status";
import { ApiResponse } from "../response";
import { sanitizeInputAsAlphabetOnly } from "../../util/sanitizer";
import { PlayfairUseCase } from "../use-case/playfair";

export class PlayfairController {
  private playfairUseCase;
  private router;

  constructor(playfairUseCase: PlayfairUseCase) {
    this.playfairUseCase = playfairUseCase;
    this.router = express.Router();

    this.router.put("/playfair/encrypt/text", (req, res) => {
      try {
        const parsedRequest = textEncryptRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;
        const result = this.playfairUseCase.encrypt({
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

    this.router.put("/playfair/decrypt/text", (req, res) => {
      try {
        const parsedRequest = textDecryptRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;
        const result = this.playfairUseCase.decrypt({
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
