"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Form from "next/form";
import { useActionState, useState } from "react";
import { z } from "zod/v4";
import { doSomething } from "./action";
import { schema, type formSchema } from "./schema";
import { useDebounceCallback } from "usehooks-ts";

const initialState: z.infer<typeof formSchema> = {
  data: {
    name: "",
    age: 0,
  },
};

export function MyForm() {
  const [state, formAction, isPending] = useActionState(
    doSomething,
    initialState,
  );
  const [errors, setErrors] = useState<{
    name?: string | null;
    age?: string | null;
  }>({});
  const debouncedSetErrors = useDebounceCallback(setErrors, 500)
  return (
    <Form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            defaultValue={state?.data?.name}
            onChange={(e) => {
              const result = schema.pick({ name: true }).safeParse({
                name: e.target.value,
              });
              if (result.success) {
                debouncedSetErrors((prev) => ({ ...prev, name: null }));
              } else {
                const errors = z.treeifyError(result.error).properties?.name?.errors;
                debouncedSetErrors((prev) => ({ ...prev, name: errors?.join(", ") }));
              }
            }}
          />
        </div>
        <span className="text-destructive">
          {errors.name !== null && (errors.name || state?.properties?.name?.errors?.join(", "))}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Label htmlFor="age">Age</Label>
          <Input type="number" name="age" defaultValue={state?.data?.age} 
                      onChange={(e) => {
                        const result = schema.pick({ age: true }).safeParse({
                          age: e.target.value,
                        });
                        if (result.success) {
                          debouncedSetErrors((prev) => ({ ...prev, age: null }));
                        } else {
                          const errors = z.treeifyError(result.error).properties?.age?.errors;
                          debouncedSetErrors((prev) => ({ ...prev, age: errors?.join(", ") }));
                        }
                      }}
          />
        </div>
        <span className="text-destructive">
          {errors.age !== null && (errors.age || state?.properties?.age?.errors?.join(", "))}
        </span>
      </div>
      <div>
        <Button
          disabled={isPending}
          type="submit"
          className="flex items-center gap-2"
        >
          {isPending ? <Loader2 className="animate-spin" /> : null}
          Submit
        </Button>
      </div>
    </Form>
  );
}
