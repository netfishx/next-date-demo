"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Form from "next/form";
import { useActionState, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { z } from "zod/v4";
import { doSomething } from "./action";
import { type formSchema, schema } from "./schema";

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
    name?: string | false;
    age?: string | false;
  }>({});
  const debouncedSetErrors = useDebounceCallback(setErrors, 500);
  return (
    <Form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={state?.data?.name}
            onChange={(e) => {
              const result = schema.pick({ name: true }).safeParse({
                name: e.target.value,
              });
              if (result.success) {
                debouncedSetErrors((prev) => ({ ...prev, name: false }));
              } else {
                const errors = z.treeifyError(result.error).properties?.name
                  ?.errors;
                debouncedSetErrors((prev) => ({
                  ...prev,
                  name: errors?.join(", "),
                }));
              }
            }}
          />
        </div>
        <span className="text-destructive">
          {errors.name !== false &&
            (errors.name || state?.properties?.name?.errors?.join(", "))}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Label htmlFor="age">Age</Label>
          <Input
            type="number"
            name="age"
            defaultValue={state?.data?.age}
            id="age"
            onChange={(e) => {
              const result = schema.pick({ age: true }).safeParse({
                age: e.target.value,
              });
              if (result.success) {
                debouncedSetErrors((prev) => ({ ...prev, age: false }));
              } else {
                const errors = z.treeifyError(result.error).properties?.age
                  ?.errors;
                debouncedSetErrors((prev) => ({
                  ...prev,
                  age: errors?.join(", "),
                }));
              }
            }}
          />
        </div>
        <span className="text-destructive">
          {errors.age !== false &&
            (errors.age || state?.properties?.age?.errors?.join(", "))}
        </span>
      </div>
      <div>
        <Button
          disabled={isPending || !!errors.name || !!errors.age}
          type="submit"
          className="flex items-center gap-2 w-24"
        >
          {isPending ? <Loader2 className="animate-spin" /> : null}
          Submit
        </Button>
      </div>
    </Form>
  );
}
