import { z } from "zod";

export const textEncryptRequestSchema = z.object({
  text: z.string({ required_error: "Text must be provided" }),
  key: z.string({ required_error: "Key must be provided" }),
});

export const textDecryptRequestSchema = z.object({
  text: z.string({ required_error: "Text must be provided" }),
  key: z.string({ required_error: "Key must be provided" }),
});

export const base64EncryptRequestSchema = z.object({
  base64: z.string({ required_error: "Base64 must be provided" }),
  key: z.string({ required_error: "Key must be provided" }),
});

export const base64DecryptRequestSchema = z.object({
  base64: z.string({ required_error: "Base64 must be provided" }),
  key: z.string({ required_error: "Key must be provided" }),
});
