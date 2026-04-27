"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import { size } from "zod";

const InHouseDataColumn = ({ actions, selectedRows, setSelectedRows }) => {
  return [
    {
      id: "select",
      size: 50, // Diperkecil karena hanya berisi checkbox
      header: ({ table }) => {
        const pageRows = table.getRowModel().rows;
        const allSelected =
          pageRows.length > 0
            ? pageRows.every((row) => !!selectedRows[row.original.id])
            : false;
        const someSelected = pageRows.some(
          (row) => !!selectedRows[row.original.id],
        );
        return (
          <Checkbox
            checked={allSelected}
            indeterminate={!allSelected && someSelected}
            onCheckedChange={(checked) => {
              setSelectedRows((prev) => {
                const updated = { ...prev };
                pageRows.forEach((row) => {
                  if (checked) {
                    updated[row.original.id] = row.original;
                  } else {
                    delete updated[row.original.id];
                  }
                });
                return updated;
              });
            }}
          />
        );
      },
      cell: ({ row }) => {
        const original = row.original;
        return (
          <Checkbox
            checked={!!selectedRows[original.id]}
            onCheckedChange={(checked) => {
              setSelectedRows((prev) => {
                const updated = { ...prev };
                if (checked) {
                  updated[original.id] = original;
                } else {
                  delete updated[original.id];
                }
                return updated;
              });
            }}
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "InHouse Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "division",
      header: "Division",
    },
    {
      accessorKey: "level",
      header: "Level",
    },

    {
      id: "actions",
      enableHiding: false,
      header: "",
      cell: ({ row, index }) => {
        const rowData = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 ms-auto">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border border-muted rounded-[8px]"
            >
              {actions?.map((item, index) => {
                const IconComponent = item?.icon;
                const isDelete = item.label === "Delete";
                return (
                  <div key={index}>
                    {isDelete && index !== 0 && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      key={index}
                      onClick={() => item?.onClick(rowData)}
                      className={item?.className}
                    >
                      {IconComponent && (
                        <IconComponent className="mr-2 h-4 w-4" />
                      )}
                      {item?.label}
                    </DropdownMenuItem>
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ].filter(Boolean);
};

export default InHouseDataColumn;
