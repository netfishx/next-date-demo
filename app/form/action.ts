"use server"; // action.ts

import { z } from "zod/v4";
import { type formSchema, schema } from "./schema";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function doSomething(
  prevState: z.infer<typeof formSchema>,
  formData: FormData,
) {
  await sleep(1000);
  const data = Object.fromEntries(formData);
  try {
    const validatedData = schema.parse(data);
    return {
      data: validatedData,
    };
  } catch (e) {
    console.error(e);
    if (e instanceof z.ZodError) {
      return {
        data: data as unknown as z.infer<typeof schema>,
        issues: e.issues.map((issue) => ({
          message: issue.message,
          path: issue.path.join("."),
        })),
      };
    }
  }
}
