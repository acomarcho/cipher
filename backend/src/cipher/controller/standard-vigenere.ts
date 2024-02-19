import express from "express";
import { StandardVigenereUseCase } from "../use-case/standard-vigenere";
import {
  textEncryptRequestSchema,
  textDecryptRequestSchema,
  fileTextRequestSchema,
} from "../request";
import status from "http-status";
import { ApiResponse } from "../response";
import { sanitizeInputAsAlphabetOnly } from "../../util/sanitizer";
import fs from "fs/promises";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

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

    this.router.put(
      "/standard-vigenere/encrypt/file",
      upload.single("file"),
      async (req, res) => {
        try {
          if (!req.file) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "File not given"));
          }

          const parsedRequest = fileTextRequestSchema.safeParse(req.body);
          if (!parsedRequest.success) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "Incomplete fields"));
          }

          const fileContents = await fs.readFile(req.file.path, "utf8");

          const { key } = parsedRequest.data;
          const result = this.standardVigenereUseCase.encrypt({
            plainText: sanitizeInputAsAlphabetOnly(fileContents).toUpperCase(),
            key: sanitizeInputAsAlphabetOnly(key).toUpperCase(),
          });

          await fs.writeFile(req.file.path, result.text, "utf-8");
          const newFileContents = await fs.readFile(req.file.path);

          return res
            .status(status.OK)
            .json(
              new ApiResponse(
                { file: newFileContents, fileName: req.file.originalname },
                null
              )
            );
        } catch (error) {
          return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(new ApiResponse(null, error));
        }
      }
    );

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
