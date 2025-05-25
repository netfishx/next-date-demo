"use client";

import { addDays, format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";
import { useState } from "react";

export function DatePickerDemo() {
  const [date, setDate] = useQueryState(
    "date",
    parseAsString.withOptions({
      shallow: false,
    }),
  );
  const [day, setDay] = useState<Date>();
  useEffect(() => {
    if (!date) {
      setDay(new Date());
    } else if (date === "2") {
      setDay(addDays(new Date(), 1));
    } else {
      setDay(parse(date, "yyyy-MM-dd", new Date()));
    }
  }, [date]);
  function handleDateChange(date: Date | undefined) {
    if (!date) {
      setDate(null);
      return;
    }
    setDate(format(date, "yyyy-MM-dd"));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !day && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {day ? format(day, "yyyy-MM-dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={day}
          onSelect={handleDateChange}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
