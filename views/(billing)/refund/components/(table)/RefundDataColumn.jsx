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
import IconifyIcon from "@/components/icon";

const RefundDataColumn = ({ actions, handleModalOpen }) => {
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
      size: 20,
    },
    {
      accessorKey: "date",
      // header: "Customer Name",
      header: () => <div className="w-28 truncate">Refund Date</div>,
      size: 150,
      cell: ({ row }) => {
        const value = row.getValue("date");
        return (
          <div className="w-28 truncate" title={value}>
            {value}
          </div>
        );
      },
    },
    {
      accessorKey: "customerName",
      // header: "Billing Period",
      header: () => <div className="w-28 truncate">Customer Name</div>,
      size: 150,
      cell: ({ row }) => {
        const value = row.getValue("customerName");
        return (
          <div className="w-28 truncate" title={value}>
            {value}
          </div>
        );
      },
    },
    {
      accessorKey: "noInvoice",
      // header: "Invoice No.",
      header: () => <div className="w-28 truncate">Original Invoice No.</div>,
      size: 150,
      cell: ({ row }) => {
        const value = row.getValue("noInvoice");
        return (
          <div className="flex items-center gap-2 w-28 cursor-pointer" title={value} onClick={() => handleModalOpen("detail", row.original)}>
            <IconifyIcon icon="lucide:mail" className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="truncate text-primary">{value}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "refundMethod",
      // header: "Due Date",
      header: () => <div className="w-28 truncate">Refund Method</div>,
      size: 150,
      cell: ({ row }) => {
        const value = row.getValue("refundMethod");
        return (
          <div className="w-28 truncate" title={value}>
            {value}
          </div>
        );
      },
    },
    {
      accessorKey: "reason",
      // header: "Due Date",
      header: () => <div className="w-28 truncate">Reason</div>,
      size: 150,
      cell: ({ row }) => {
        const value = row.getValue("reason");
        return (
          <div className="w-28 truncate" title={value}>
            {value}
          </div>
        );
      },
    },
    
    {
      accessorKey: "amount",
      // header: "Amount",
      header: () => <div className="w-28 truncate">Refund Amount</div>,
      size: 200,
      cell: ({ row }) => {
        const value = row.getValue("amount");
        return (
          <div className="w-28 truncate" title={value}>
            {value}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 20,
      cell: ({ row }) => {
        const statusValue = row.original.status;
        const rowId = row.original.id;

        const paidActions = [
          {
            label: "Change Status",
            items: [
              {
                label: "Mark as paid",
                value: "Paid",
                onClick: (v) => handleStatusUpdate(rowId, v),
              },
              {
                label: "Mark as unpaid",
                value: "Unpaid",
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
              statusValue === "Paid" ? "outlined-active" : "outlined-inactive"
            }
            iconClassName={
              statusValue === "Paid" ? "text-emerald-500" : "text-slate-400"
            }
            sections={paidActions}
          />
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Action",
      size: 20,
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

export default RefundDataColumn;
