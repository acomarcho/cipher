import express from "express";
import status from "http-status";
import { sanitizeInputAsAlphabetOnly } from "../../util/sanitizer";
import { superRequestSchema } from "../request";
import { ApiResponse } from "../response";
import { SuperUseCase } from "../use-case/super";

export class SuperController {
  private superUseCase;
  private router;

  constructor(superUseCase: SuperUseCase) {
    this.superUseCase = superUseCase;
    this.router = express.Router();

    this.router.put("/super/encrypt/text", (req, res) => {
      try {
        const parsedRequest = superRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;

        const result = this.superUseCase.encrypt({
          plainText: text,
          key: key,
        });

        return res.status(status.OK).json(new ApiResponse(result, null));
      } catch (error) {
        return res
          .status(status.INTERNAL_SERVER_ERROR)
          .json(new ApiResponse(null, error));
      }
    });

    this.router.put("/super/decrypt/text", (req, res) => {
      try {
        const parsedRequest = superRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;

        const result = this.superUseCase.decrypt({
          cipherText: text,
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
