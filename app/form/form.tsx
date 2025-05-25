"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import { useActionState } from "react";
import type { z } from "zod/v4";
import { doSomething } from "./action";
import type { formSchema } from "./schema";
import { Loader2 } from "lucide-react";

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
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" defaultValue={state?.data?.name} />
        <span className="text-destructive">
          {state?.issues?.find((issue) => issue.path === "name")?.message}
        </span>
      </div>
      <div>
        <Label htmlFor="age">Age</Label>
        <Input type="number" name="age" defaultValue={state?.data?.age} />
        <span className="text-destructive">
          {state?.issues?.find((issue) => issue.path === "age")?.message}
        </span>
      </div>
      <div>
        <Button disabled={isPending} type="submit" className="flex items-center gap-2">
          {isPending ? <Loader2 className="animate-spin" /> : null}
          Submit
        </Button>
      </div>
    </Form>
  );
}
