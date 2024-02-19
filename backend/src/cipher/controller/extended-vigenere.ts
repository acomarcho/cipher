import express from "express";
import fs from "fs/promises";
import status from "http-status";
import multer from "multer";
import stream from "stream";
import {
  fileTextRequestSchema,
  textDecryptRequestSchema,
  textEncryptRequestSchema,
} from "../request";
import { ApiResponse } from "../response";
import { ExtendedVigenereUseCase } from "../use-case/extended-vigenere";
const upload = multer({ dest: "uploads/" });

export class ExtendedVigenereController {
  private extendedVigenereUseCase;
  private router;

  constructor(extendedVigenereUseCase: ExtendedVigenereUseCase) {
    this.extendedVigenereUseCase = extendedVigenereUseCase;
    this.router = express.Router();

    this.router.put("/extended-vigenere/encrypt/text", (req, res) => {
      try {
        const parsedRequest = textEncryptRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;
        const result = this.extendedVigenereUseCase.encrypt({
          plainText: btoa(text),
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
      "/extended-vigenere/encrypt/file",
      upload.single("file"),
      async (req, res) => {
        /**
         * The input file gets converted into base64,
         * and then the base64 is encrypted as ASCII.
         */
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

          const fileContents = await fs.readFile(req.file.path, "base64");
          const { key } = parsedRequest.data;
          const result = this.extendedVigenereUseCase.encrypt({
            plainText: fileContents,
            key: key,
          });

          await fs.writeFile(req.file.path, result.text);
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

    this.router.put("/extended-vigenere/decrypt/text", (req, res) => {
      try {
        const parsedRequest = textDecryptRequestSchema.safeParse(req.body);
        if (!parsedRequest.success) {
          return res
            .status(status.BAD_REQUEST)
            .json(new ApiResponse(null, "Incomplete fields"));
        }

        const { text, key } = parsedRequest.data;
        const result = this.extendedVigenereUseCase.decrypt({
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

    this.router.put(
      "/extended-vigenere/decrypt/file",
      upload.single("file"),
      async (req, res) => {
        /**
         * This reads an encrypted base64 string.
         * Hence, result.text is a base64 string you can immediately write to disk.
         */
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

          const fileContents = await fs.readFile(req.file.path);

          const { key } = parsedRequest.data;
          const result = this.extendedVigenereUseCase.decrypt({
            cipherText: fileContents.toString(),
            key: key,
          });

          res.set(
            "Content-Disposition",
            "attachment; filename=" + req.file.originalname
          );
          return res.send(result.text);
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
