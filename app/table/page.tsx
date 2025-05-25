import { Suspense } from "react";
import { getData } from "./action";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Interval } from "./interval";

export default function Page() {
  return <div className="p-4">
    <Suspense>
        <MyTable />
    </Suspense>
    <Interval />
  </div>;
}

async function MyTable() {
  const data = await getData();
  return <Table>
    <TableHeader>
        <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {data.data.map((item) => (
            <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.age}</TableCell>
            </TableRow>
        ))}
    </TableBody>
  </Table>
}