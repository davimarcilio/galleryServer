import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  login: z.string().min(5),
  password: z.string().min(6),
});
