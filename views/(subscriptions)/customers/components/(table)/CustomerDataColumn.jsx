"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import IconifyIcon from "@/components/icon";

const CustomerDataColumn = ({ actions }) => {
  return [
    {
      accessorKey: "name",
      header: "ISP Name",
      cell: ({ row }) => (
        <div className="w-20 truncate">{row.getValue("name")}</div>
      )
    },
    {
      accessorKey: "legalName",
      header: "Legal Name",
      cell: ({ row }) => (
        <div className="w-20 truncate">{row.getValue("legalName")}</div>
      )
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="w-20 truncate">{row.getValue("email")}</div>
      )
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <div className="w-20 truncate">{row.getValue("phone")}</div>
      )
    },
    {
      accessorKey: "invoiceNumber",
      header: "Contact Person",
      cell: ({ row }) => (
        <div className="w-20 truncate">{row.getValue("invoiceNumber")}</div>
      )
    },
    {
      accessorKey: "province",
      header: "Province",
      cell: ({ row }) => (
        <div className="w-20 truncate">{row.getValue("province")}</div>
      )
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => (
        <div className="w-20 truncate">{row.getValue("city")}</div>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 20,
      cell: ({ row }) => {
        const item = row.original;
        const statusValue = item?.status;
        const variantMap = {
          "Active": "outlined-active",
          "Inactive": "outlined-inactive"
        };

        const variant = variantMap[statusValue] || "outlined";

        return (
          <Badge
            variant={variant}
            className="flex items-center gap-2 capitalize"
          >
            {statusValue ?? " - "}
          </Badge>
        );
      }
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

export default CustomerDataColumn;
