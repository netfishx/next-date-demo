"use server";

import { unstable_cacheLife } from "next/cache";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const data = [
  { id: 0, name: "All", age: 0 },
  { id: 1, name: "John Doe", age: 20 },
  { id: 2, name: "Jane Doe", age: 21 },
  { id: 3, name: "Jim Doe", age: 22 },
  { id: 4, name: "Jill Doe", age: 23 },
  { id: 5, name: "Jack Doe", age: 24 },
  { id: 6, name: "Jill Doe", age: 25 },
  { id: 7, name: "Jack Doe", age: 26 },
  { id: 8, name: "Jill Doe", age: 27 },
  { id: 9, name: "Jack Doe", age: 28 },
];

export async function getData() {
  "use cache";

  unstable_cacheLife({
    stale: 4,
    revalidate: 4,
    expire: 10,
  });
  await sleep(500);
  const num = Math.floor(Math.random() * 10);
  const filteredData = data.filter((item) => item.id <= num);
  return {
    data: filteredData,
  };
}
