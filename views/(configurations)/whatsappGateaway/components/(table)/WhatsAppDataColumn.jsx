"use client";

import { Badge } from "@/components/ui/badge";
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
import { size } from "zod";

const WhatsAppDataColumn = ({ actions }) => {
  return [
    {
      accessorKey: "name",
      header: "Template Features",
    },
    {
      accessorKey: "number",
      header: "Message",
    },
    {
      accessorKey: "status",
      header: "Status",
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
      cell: ({ row }) => {
        const rowData = row.original;

        const editAction = actions?.find(action => action.label === "Edit");

        if (!editAction) return null;

        const IconComponent = editAction.icon;

        return (
          <div className="flex justify-end"> 
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-blue-50 flex items-center gap-1.5 font-medium"
              onClick={() => editAction.onClick(rowData)}
            >
              {IconComponent && <IconComponent className="h-4 w-4" />}
              <span>Edit</span>
            </Button>
          </div>
        );
      }
    }
  ].filter(Boolean);
};

export default WhatsAppDataColumn;