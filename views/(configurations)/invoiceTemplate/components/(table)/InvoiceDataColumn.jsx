"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import { size } from "zod";

const InvoiceDataColumn = ({ actions }) => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 10,
    },
    {
      accessorKey: "name",
      header: "ISP Name",
    },
    {
      accessorKey: "templateName",
      header: "Template Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "default",
      header: "Default",
    },
    {
      accessorKey: "lastUpdate",
      header: "Last Update",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusValue = row.original.status;
        const rowId = row.original.id;

        const statusActions = [
          {
            label: "Change Status",
            items: [
              {
                label: "Mark as active",
                value: "Active",
                onClick: (v) => handleStatusUpdate(rowId, v)
              },
              {
                label: "Mark as non active",
                value: "Inactive",
                onClick: (v) => handleStatusUpdate(rowId, v)
              },
            ]
          }
        ];

        return (
          <SelectDropdown
            asBadge={true} 
            triggerLabel={statusValue}
            badgeVariant={statusValue === "Active" ? "outlined-active" : "outlined-inactive"}
            iconClassName={statusValue === "Active" ? "text-emerald-500" : "text-slate-400"}
            sections={statusActions}
          />
        );
      },
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
            <DropdownMenuContent align="end" className="border border-muted rounded-[8px]">
              {actions?.map((item, index) => {
                const IconComponent = item?.icon;
                const isDelete = item.label === "Delete"
                return (
                  <div key={index}>
                    {isDelete && index !== 0 && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      key={index}
                      onClick={() => item?.onClick(rowData)}
                      className={item?.className}
                    >
                      {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                      {item?.label}
                    </DropdownMenuItem>
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ].filter(Boolean);
};

export default InvoiceDataColumn;