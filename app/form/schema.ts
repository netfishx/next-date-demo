import { z } from "zod/v4";

export const schema = z.object({
  name: z.string().min(4),
  age: z.coerce.number().min(12),
});

export const formSchema = z
  .object({
    data: schema.optional(),
    properties: z.object({
        name: z.object({
          errors: z.array(z.string()).optional(),
        }).optional(),
        age: z.object({
          errors: z.array(z.string()).optional(),
        }).optional(),
      })
      .optional(),
  })
  .optional();
