import express from "express";
import status from "http-status";
import { sanitizeInputAsAlphabetOnly } from "../../util/sanitizer";
import { affineRequestSchema } from "../request";
import { ApiResponse } from "../response";
import { AffineUseCase } from "../use-case/affine";

export class AffineController {
  private affineUseCase;
  private router;

  constructor(affineUseCase: AffineUseCase) {
    this.affineUseCase = affineUseCase;
    this.router = express.Router();

    this.router.put("/affine/encrypt/text", (req, res) => {
      try {
        const parsedRequest = affineRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;
        const result = this.affineUseCase.encrypt({
          plainText: sanitizeInputAsAlphabetOnly(text).toUpperCase(),
          key: key,
        });

        return res.status(status.OK).json(new ApiResponse(result, null));
      } catch (error) {
        return res
          .status(status.INTERNAL_SERVER_ERROR)
          .json(new ApiResponse(null, error));
      }
    });

    this.router.put("/affine/decrypt/text", (req, res) => {
      try {
        const parsedRequest = affineRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;
        const result = this.affineUseCase.decrypt({
          cipherText: sanitizeInputAsAlphabetOnly(text).toUpperCase(),
          key: key,
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
