"use client";

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
import { cn } from "@/lib/utils";

const PopDataColumn = ({ actions }) => {
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
      accessorKey: "area",
      header: "Area/Region",
    },
    {
      accessorKey: "popName",
      header: "POP Name",
      cell: ({ row }) => {
        return <div>{row.getValue("popName")}</div>;
      },
    },
    {
      accessorKey: "longitude_latitude",
      header: "Longitude, Latitude",
      cell: ({ row }) => {
        return <div>{row.getValue("longitude_latitude")}</div>;
      },
    },
    {
      accessorKey: "locationNotes",
      header: "Location Notes",
      cell: ({ row }) => {
        return (
          <div className="text-muted-foreground">
            {row.getValue("locationNotes")}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 50,
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
                onClick: (v) => handleStatusUpdate(rowId, v),
              },

              {
                label: "Mark as inactive",
                value: "Inactive",
                onClick: (v) => handleStatusUpdate(rowId, v),
              },
            ],
          },
        ];

        return (
          <SelectDropdown
            asBadge={true}
            triggerLabel={statusValue}
            badgeVariant={
              statusValue === "Active" ? "outlined-active" : "outlined-inactive"
            }
            iconClassName={
              statusValue === "Active" ? "text-emerald-500" : "text-slate-400"
            }
            sections={statusActions}
          />
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      size: 50,
      cell: ({ row, index }) => {
        const rowData = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 ms-auto outline-none">
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
                    {isDelete && <DropdownMenuSeparator />}

                    <DropdownMenuItem
                      onClick={() => item?.onClick(rowData)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm",
                      )}
                    >
                      {IconComponent && <IconComponent className="h-4 w-4" />}
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

export default PopDataColumn;
