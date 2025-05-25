"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Form from "next/form";
import { useActionState } from "react";
import type { z } from "zod/v4";
import { doSomething } from "./action";
import type { formSchema } from "./schema";

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

  return (
    <Form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" defaultValue={state?.data?.name} />
        </div>
        <span className="text-destructive">
          {state?.issues?.find((issue) => issue.path === "name")?.message}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Label htmlFor="age">Age</Label>
          <Input type="number" name="age" defaultValue={state?.data?.age} />
        </div>
        <span className="text-destructive">
          {state?.issues?.find((issue) => issue.path === "age")?.message}
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
