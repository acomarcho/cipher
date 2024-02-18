import { z } from "zod";

export const textEncryptRequestSchema = z.object({
  text: z.string(),
  key: z.string(),
});
export const textDecryptRequestSchema = z.object({
  text: z.string(),
  key: z.string(),
});

export const affineRequestSchema = z.object({
  text: z.string(),
  key: z.object({
    m: z.number(),
    b: z.number(),
  }),
});
