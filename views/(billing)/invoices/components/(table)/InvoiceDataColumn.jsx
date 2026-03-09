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

const InvoiceDataColumn = ({ actions, handleModalOpen }) => {
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
      accessorKey: "date",
      // header: "Customer Name",
      header: () => <div className="w-full truncate">Date</div>,
      size: 200,
      cell: ({ row }) => {
        const value = row.getValue("date");
        return (
          <div className="w-full truncate" title={value}>
            {value}
          </div>
        );
      },
    },
    {
      accessorKey: "noInvoice",
      // header: "Invoice No.",
      header: () => <div className="w-full truncate">Invoice No.</div>,
      size: 200,
      cell: ({ row }) => {
        const value = row.getValue("noInvoice");
        return (
          <div className="flex items-center gap-2 w-full cursor-pointer" title={value} onClick={() => handleModalOpen("detail", row.original)}>
            <IconifyIcon icon="lucide:mail" className="w-4 h-4 text-muted-foreground" />
            <span className="truncate text-primary">{value}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "customerName",
      // header: "Billing Period",
      header: () => <div className="w-full truncate">Customer Name</div>,
      size: 200,
      cell: ({ row }) => {
        const value = row.getValue("customerName");
        return (
          <div className="w-full truncate" title={value}>
            {value}
          </div>
        );
      },
    },
    {
      accessorKey: "billingPeriod",
      // header: "Due Date",
      header: () => <div className="w-full truncate">Billing Period</div>,
      size: 200,
      cell: ({ row }) => {
        const value = row.getValue("billingPeriod");
        return (
          <div className="w-full truncate" title={value}>
            {value}
          </div>
        );
      },
    },
    {
      accessorKey: "dueDate",
      // header: "Due Date",
      header: () => <div className="w-full truncate">Due Date</div>,
      size: 200,
      cell: ({ row }) => {
        const value = row.getValue("dueDate");
        return (
          <div className="w-full truncate" title={value}>
            {value}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      // header: "Amount",
      header: () => <div className="w-full truncate">Amount</div>,
      size: 200,
      cell: ({ row }) => {
        const value = row.getValue("amount");
        return (
          <div className="w-full truncate" title={value}>
            {value}
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
      size: 50,
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

export default InvoiceDataColumn;
