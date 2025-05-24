import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { getDate } from "./api";
import { DatePickerDemo } from "./date-picker";

export default function Home({
  searchParams,
}: { searchParams: Promise<{ date?: string }> }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center p-2 gap-2">
        <Button>
          <Link href="/">今天</Link>
        </Button>
        <Button>
          <Link href="/?date=2">明天</Link>
        </Button>
        <Suspense>
          <DatePickerDemo />
        </Suspense>
      </div>
      <div className="gap-2">
        date:{" "}
        <Suspense>
          <Date searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function Date({
  searchParams,
}: { searchParams: Promise<{ date?: string }> }) {
  const params = await searchParams;
  const date = await getDate(params.date);
  return date.date;
}
