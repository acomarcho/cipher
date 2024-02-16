import { z } from "zod";

export const encryptRequestSchema = z.object({
  text: z.string({ required_error: "Text must be provided" }),
  key: z.string({ required_error: "Key must be provided" }),
});
