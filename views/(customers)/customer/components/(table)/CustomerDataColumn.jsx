"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import { cn } from "@/lib/utils";

const CustomerDataColumn = ({ actions, selectedRows, setSelectedRows }) => {
  const handleStatusUpdate = (id, status) => {
    // Tambahkan logika update status di sini jika diperlukan
    console.log(`Updating ${id} to ${status}`);
  };

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
          (row) => !!selectedRows[row.original.id]
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
      enableHiding: false
    },
    {
      accessorKey: "name",
      header: () => <div className="whitespace-nowrap">Customer Name</div>,
      size: 200,
    },
    {
      accessorKey: "companyName",
      header: () => <div className="whitespace-nowrap">Company Name</div>,
      size: 180,
      cell: ({ row }) => {
        const value = row.getValue("companyName");
        return (
          <div className="w-20 truncate" title={value}>
            {value}
          </div>
        );
      }
    },
    {
      accessorKey: "email",
      header: () => <div className="whitespace-nowrap">Email</div>,
      size: 200,
      cell: ({ row }) => {
        const value = row.getValue("email");
        return (
          <div className="w-20 truncate" title={value}>
            {value}
          </div>
        );
      }
    },
    {
      accessorKey: "customerSegment",
      header: () => (
        <div className="flex items-center whitespace-nowrap gap-2">
          Customer Segment <ArrowDownUp className="w-4 h-4" />
        </div>
      ),
      size: 180,
    },
    {
      accessorKey: "orderDate",
      header: () => <div className="whitespace-nowrap">Order Date</div>,
      size: 300,
    },
    {
      accessorKey: "homepass",
      header: () => <div className="whitespace-nowrap">Homepass</div>,
      size: 150,
      cell: ({ row }) => {
        const value = row.getValue("homepass");
        return (
          <div className="w-20 truncate" title={value}>
            {value}
          </div>
        );
      }
    },
    {
      accessorKey: "status",
      header: () => <div className="whitespace-nowrap">Customer Status</div>,
      size: 180,
      cell: ({ row }) => {
        const statusValue = row.original.status;
        const rowId = row.original.id;

        const statusActions = [
          {
            label: "Change Status",
            items: [
              { label: "Mark as active", value: "Active", onClick: (v) => handleStatusUpdate(rowId, v) },
              { label: "Mark as non Isolir", value: "Isolir", onClick: (v) => handleStatusUpdate(rowId, v) },
              { label: "Mark as Dismantle", value: "Dismantle", onClick: (v) => handleStatusUpdate(rowId, v) },
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
      size: 80,
      header: () => <div className="text-right whitespace-nowrap">Action</div>,
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border border-muted rounded-[8px]">
                {actions?.map((item, index) => {
                  const IconComponent = item?.icon;
                  const isDelete = item.label === "Delete";
                  return (
                    <div key={index}>
                      {isDelete && <DropdownMenuSeparator />}
                      <DropdownMenuItem
                        onClick={() => item?.onClick(rowData)}
                        className="flex items-center gap-3 px-3 py-2 text-sm"
                      >
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        {item?.label}
                      </DropdownMenuItem>
                    </div>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      }
    }
  ].filter(Boolean);
};

export default CustomerDataColumn;