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

export const hillRequestSchema = z.object({
  text: z.string(),
  key: z.array(z.array(z.number())),
});

export const superRequestSchema = z.object({
  text: z.string(),
  key: z.object({
    vigenere: z.string(),
    transposition: z.number(),
  }),
});

export const fileTextRequestSchema = z.object({
  key: z.string(),
});

export const fileAffineRequestSchema = z.object({
  key: z.object({
    m: z.number(),
    b: z.number(),
  }),
});

export const fileHillRequestSchema = z.object({
  key: z.array(z.array(z.number())),
});

export const fileSuperRequestSchema = z.object({
  key: z.object({
    vigenere: z.string(),
    transposition: z.number(),
  }),
});
