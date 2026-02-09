// components/data-table/DataTablePagination.tsx
"use client";

import { PaginationInfo } from "./PaginationInfo";
import { PerPageSelect } from "./PerPageSelect";
import { PaginationControls } from "./PaginationControls";

export function DataTablePagination({ table }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
      <PaginationInfo table={table} />
      <div className="flex items-center space-x-4">
        <PerPageSelect table={table} />
        <PaginationControls table={table} />
      </div>
    </div>
  );
}
