import express from "express";
import fs from "fs/promises";
import status from "http-status";
import multer from "multer";
import stream from "stream";
import { sanitizeInputAsAlphabetOnly } from "../../util/sanitizer";
import {
  fileTextRequestSchema,
  textDecryptRequestSchema,
  textEncryptRequestSchema,
} from "../request";
import { ApiResponse } from "../response";
import { AutoKeyVigenereUseCase } from "../use-case/auto-key-vigenere";
const upload = multer({ dest: "uploads/" });

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

    this.router.put(
      "/auto-key-vigenere/encrypt/file",
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
          const result = this.autoKeyVigenereUseCase.encrypt({
            plainText: sanitizeInputAsAlphabetOnly(fileContents).toUpperCase(),
            key: sanitizeInputAsAlphabetOnly(key).toUpperCase(),
          });

          await fs.writeFile(req.file.path, result.text, "utf-8");
          const newFileContents = await fs.readFile(req.file.path);

          const readStream = new stream.PassThrough();
          readStream.end(newFileContents);

          res.set(
            "Content-Disposition",
            "attachment; filename=" + req.file.originalname
          );
          res.set("Content-Type", "text/plain");
          return readStream.pipe(res);
        } catch (error) {
          return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(new ApiResponse(null, error));
        }
      }
    );

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

    this.router.put(
      "/auto-key-vigenere/decrypt/file",
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
          const result = this.autoKeyVigenereUseCase.decrypt({
            cipherText: sanitizeInputAsAlphabetOnly(fileContents).toUpperCase(),
            key: sanitizeInputAsAlphabetOnly(key).toUpperCase(),
          });

          await fs.writeFile(req.file.path, result.text, "utf-8");
          const newFileContents = await fs.readFile(req.file.path);

          const readStream = new stream.PassThrough();
          readStream.end(newFileContents);

          res.set(
            "Content-Disposition",
            "attachment; filename=" + req.file.originalname
          );
          res.set("Content-Type", "text/plain");
          return readStream.pipe(res);
        } catch (error) {
          return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(new ApiResponse(null, error));
        }
      }
    );
  }

  public getRouter = () => {
    return this.router;
  };
}
