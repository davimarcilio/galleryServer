import { z } from "zod";

export const uploadSchema = z.object({
  name: z.string(),
  src: z.string(),
  size: z.number(),
  userId: z.number(),
});
