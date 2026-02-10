"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Icon } from "@iconify/react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui-p/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-p/select";
import { Button } from "@/components/ui-p/button";
import { cn } from "@/lib/utils";

export default function DataTableComponent({
  columns = [], // Default ke array kosong
  data = [], // Default ke array kosong
  pagination = { pageIndex: 0, pageLimit: 10 },
  withoutRowsFilter = false,
  withoutRowsSelected = false,
}) {
  const [rowSelection, setRowSelection] = useState({});
  const totalData = data?.length || 0;
  const table = useReactTable({
    data: data || [],
    columns: columns || [],
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  // Proteksi tambahan: jika table belum siap, tampilkan loading sederhana
  if (!table)
    return <div className="p-4 text-center">Initializing Table...</div>;

  return (
    <div className="">
      <div className="relative w-full">
        <div className="rounded-[5px] border border-[#E2E8F0] overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F1F5F980]">
              {table.getHeaderGroups()?.map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-sm text-[#64748B] whitespace-nowrap"
                    >
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="h-14">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length || 1}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer Sederhana */}
      <div className="flex items-center space-x-6 py-4 justify-between cursor-pointer">
        <div className="text-sm text-muted-foreground">
          <div
            className={cn(
              "text-muted-foreground flex-1 text-sm",
              withoutRowsSelected ? "hidden" : "",
            )}
          >
            {table.getFilteredSelectedRowModel().rows.length} of {totalData}{" "}
            row(s) selected.
          </div>
        </div>
        <div className="flex gap-4">
          {/* <Button variant="outline" size="sm" disabled>
            Back
          </Button> */}
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
