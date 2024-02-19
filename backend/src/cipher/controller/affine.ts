import express from "express";
import status from "http-status";
import { sanitizeInputAsAlphabetOnly } from "../../util/sanitizer";
import {
  affineRequestSchema,
  fileAffineRequestSchema,
  fileTextRequestSchema,
} from "../request";
import { ApiResponse } from "../response";
import { AffineUseCase } from "../use-case/affine";
import fs from "fs/promises";
import multer from "multer";
import stream from "stream";
const upload = multer({ dest: "uploads/" });

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

    this.router.put(
      "/affine/encrypt/file",
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
          const parsedRequest = fileAffineRequestSchema.safeParse(toParse);
          if (!parsedRequest.success) {
            return res
              .status(status.BAD_REQUEST)
              .json(new ApiResponse(null, "Incomplete fields"));
          }

          const fileContents = await fs.readFile(req.file.path, "utf8");

          const { key } = parsedRequest.data;
          const result = this.affineUseCase.encrypt({
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
