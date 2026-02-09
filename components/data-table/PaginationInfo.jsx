// components/data-table/PaginationInfo.tsx
"use client";

import { Table } from "@tanstack/react-table";

export function PaginationInfo({ table }) {
  const pageLimit = table.getState().pagination.pageLimit;
  const pageIndex = table.getState().pagination.pageIndex;

  const totalRows = table.getFilteredRowModel().rows.length;

  const from = totalRows === 0 ? 0 : pageIndex * pageLimit + 1;
  const to = Math.min((pageIndex + 1) * pageLimit, totalRows);

  return (
    <div className="text-sm text-muted-foreground">
      Menampilkan {from} - {to} dari {totalRows} data
    </div>
  );
}
