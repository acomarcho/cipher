import express from "express";
import status from "http-status";
import { sanitizeInputAsAlphabetOnly } from "../../util/sanitizer";
import { encryptRequestSchema } from "../request";
import { ApiResponse } from "../response";
import { AutoKeyVigenereUseCase } from "../use-case/auto-key-vigenere";

export class AutoKeyVigenereController {
  private autoKeyVigenereUseCase;
  private router;

  constructor(autoKeyVigenereUseCase: AutoKeyVigenereUseCase) {
    this.autoKeyVigenereUseCase = autoKeyVigenereUseCase;
    this.router = express.Router();

    this.router.put("/auto-key-vigenere/text", (req, res) => {
      try {
        const parsedRequest = encryptRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;
        const result = this.autoKeyVigenereUseCase.encrypt({
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
  }

  public getRouter = () => {
    return this.router;
  };
}
