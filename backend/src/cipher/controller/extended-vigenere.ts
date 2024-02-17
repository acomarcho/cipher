import express from "express";
import status from "http-status";
import {
  base64DecryptRequestSchema,
  base64EncryptRequestSchema,
} from "../request";
import { ApiResponse } from "../response";
import { ExtendedVigenereUseCase } from "../use-case/extended-vigenere";

export class ExtendedVigenereController {
  private extendedVigenereUseCase;
  private router;

  constructor(extendedVigenereUseCase: ExtendedVigenereUseCase) {
    this.extendedVigenereUseCase = extendedVigenereUseCase;
    this.router = express.Router();

    this.router.put("/extended-vigenere/encrypt/text", (req, res) => {
      try {
        const parsedRequest = base64EncryptRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { base64, key } = parsedRequest.data;
        const result = this.extendedVigenereUseCase.encrypt({
          plainText: atob(base64),
          key: key,
        });

        return res.status(status.OK).json(new ApiResponse(result, null));
      } catch (error) {
        return res
          .status(status.INTERNAL_SERVER_ERROR)
          .json(new ApiResponse(null, error));
      }
    });

    this.router.put("/extended-vigenere/decrypt/text", (req, res) => {
      try {
        const parsedRequest = base64DecryptRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { base64, key } = parsedRequest.data;
        const result = this.extendedVigenereUseCase.decrypt({
          cipherText: atob(base64),
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
