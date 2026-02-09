// components/data-table/PerPageSelect.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export function PerPageSelect({ table }) {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm font-medium">Tampilkan</p>
      <Select
        value={String(table.getState().pagination.pageLimit)}
        onValueChange={(value) => table.setpageLimit(Number(value))}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue
            placeholder={String(table.getState().pagination.pageLimit)}
          />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 30, 40, 50].map((pageLimit) => (
            <SelectItem key={pageLimit} value={String(pageLimit)}>
              {pageLimit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm font-medium">data</p>
    </div>
  );
}
