import { z } from "zod/v4";

export const schema = z.object({
  name: z.string().min(4),
  age: z.coerce.number().min(12),
});

export const formSchema = z
  .object({
    data: schema.optional(),
    issues: z.array(z.object({
        message: z.string(),
        path: z.string(),
    })).optional(),
  })
  .optional();
