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
    const validatedData = schema.safeParse(data);
    if (!validatedData.success) {
      return {
        data: data as unknown as z.infer<typeof schema>,
        properties: z.treeifyError(validatedData.error).properties,
      };
    }
    return {
      data: validatedData.data,
    };
  } catch (e) {
    console.error(e);
  }
}
