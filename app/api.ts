"use server";

import { tz } from "@date-fns/tz";
import { addDays, format } from "date-fns";

export async function getDate(date?: string) {
  if (date === "2") {
    return {
      date: format(addDays(new Date(), 1), "yyyy-MM-dd", {
        in: tz("Asia/Shanghai"),
      }),
    };
  }
  if (!date) {
    return {
      date: format(new Date(), "yyyy-MM-dd", {
        in: tz("Asia/Shanghai"),
      }),
    };
  }
  return {
    date: date,
  };
}
