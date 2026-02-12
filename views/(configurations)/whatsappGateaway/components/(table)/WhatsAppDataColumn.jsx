"use client";

import { Badge } from "@/components/ui-p/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const WhatsAppDataColumn = ({ actions }) => {
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
    },
    {
      accessorKey: "name",
      header: "ISP Name",
    },
    {
      accessorKey: "number",
      header: "WhatsApp Number",
    },
    {
      accessorKey: "messageQuota",
      header: "Message Quota",
    },
    {
      accessorKey: "ussage",
      header: "Ussage Today",
    },
    {
      accessorKey: "status",
      header: "Connection Status",
      cell: ({ row }) => {
        const statusValue = row.original.status;
        const variant = statusValue === "Active" ? "outlined-active" : "outlined-inactive";
        return <Badge variant={variant}>{statusValue}</Badge>;  
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
                );})}
                  </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ].filter(Boolean);
};

export default WhatsAppDataColumn;