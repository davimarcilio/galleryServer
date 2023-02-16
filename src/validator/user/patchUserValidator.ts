import { z } from "zod";

export const patchSchema = z.object({
  name: z.string().min(3).optional(),
  login: z.string().min(5).optional(),
  password: z.string().min(10).optional(),
});
