"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Interval() {
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("interval", new Date().toISOString());
      router.refresh();
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return null;
}
