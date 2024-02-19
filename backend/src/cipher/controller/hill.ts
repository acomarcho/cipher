import express from "express";
import status from "http-status";
import { sanitizeInputAsAlphabetOnly } from "../../util/sanitizer";
import {
  fileAffineRequestSchema,
  fileHillRequestSchema,
  hillRequestSchema,
} from "../request";
import { ApiResponse } from "../response";
import { HillUseCase } from "../use-case/hill";
import { det } from "mathjs";
import fs from "fs/promises";
import multer from "multer";
import stream from "stream";
const upload = multer({ dest: "uploads/" });

export class HillController {
  private hillUseCase;
  private router;

  constructor(hillUseCase: HillUseCase) {
    this.hillUseCase = hillUseCase;
    this.router = express.Router();

    this.router.put("/hill/encrypt/text", (req, res) => {
      try {
        const parsedRequest = hillRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;

        if (key.length !== key[0].length) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Key must be a square matrix"));
        }

        if (det(key) === 0) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Key must be an invertible matrix"));
        }

        const result = this.hillUseCase.encrypt({
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

    this.router.put(
      "/hill/encrypt/file",
      upload.single("file"),
      async (req, res) => {
        try {
          if (!req.file) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "File not given"));
          }

          if (!req.body.key) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "Key not given"));
          }

          const toParse = {
            key: JSON.parse(req.body.key),
          };
          const parsedRequest = fileHillRequestSchema.safeParse(toParse);
          if (!parsedRequest.success) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "Incomplete fields"));
          }

          const { key } = parsedRequest.data;
          if (key.length !== key[0].length) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "Key must be a square matrix"));
          }
          if (det(key) === 0) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "Key must be an invertible matrix"));
          }

          const fileContents = await fs.readFile(req.file.path, "utf8");

          const result = this.hillUseCase.encrypt({
            plainText: sanitizeInputAsAlphabetOnly(fileContents).toUpperCase(),
            key: key,
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

    this.router.put("/hill/decrypt/text", (req, res) => {
      try {
        const parsedRequest = hillRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;

        if (key.length !== key[0].length) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Key must be a square matrix"));
        }

        if (det(key) === 0) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Key must be an invertible matrix"));
        }

        const result = this.hillUseCase.decrypt({
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

    this.router.put(
      "/hill/decrypt/file",
      upload.single("file"),
      async (req, res) => {
        try {
          if (!req.file) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "File not given"));
          }

          if (!req.body.key) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "Key not given"));
          }

          const toParse = {
            key: JSON.parse(req.body.key),
          };
          const parsedRequest = fileHillRequestSchema.safeParse(toParse);
          if (!parsedRequest.success) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "Incomplete fields"));
          }

          const { key } = parsedRequest.data;
          if (key.length !== key[0].length) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "Key must be a square matrix"));
          }
          if (det(key) === 0) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "Key must be an invertible matrix"));
          }

          const fileContents = await fs.readFile(req.file.path, "utf8");

          const result = this.hillUseCase.decrypt({
            cipherText: sanitizeInputAsAlphabetOnly(fileContents).toUpperCase(),
            key: key,
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
