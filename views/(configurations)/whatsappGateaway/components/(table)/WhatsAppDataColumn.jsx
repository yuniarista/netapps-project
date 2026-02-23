"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Info, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { size } from "zod";
import { Switch } from "@/components/ui/switch";

const WhatsAppDataColumn = ({ actions, onStatusChange }) => {
  return [
    {
      accessorKey: "name",
      header: "Template Features",
      size: 350,
      cell: ({ row }) => {
        const name = row.getValue("name");
        const description = row.original.description;

        return (
          <div className="flex flex-col gap-1 py-1">
            <span className="text-sm text-zinc-900 leading-none">
              {name}
            </span>

            {description && (
              <span className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "message",
      header: "Message",
      size: 400,
      cell: ({ row }) => {
        const message = row.getValue("message");
        return (
          <div
            className="w-72 truncate cursor-help"
            title={message} // <-- Tambahkan ini
          >
            {message}
          </div>
        );
      }
    },
    {
      accessorKey: "status",
      header: () => <div className="flex items-center gap-2">Status <Info className="w-4 h-4" /> </div>,
      cell: ({ row }) => {
        const statusValue = row.original.status;
        const isActive = statusValue === "Active";
        const variant = isActive ? "outlined-active" : "secondary";

        return (
          <div className="flex gap-3">
            <Switch
              checked={isActive}
              onCheckedChange={(checked) => {
                // Panggil fungsi untuk update status di backend/state
                if (onStatusChange) {
                  onStatusChange(row.original, checked);
                }
              }}
            />
            <Badge variant={variant}>
              {statusValue}
            </Badge>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-right"></div>,
      cell: ({ row, index }) => {
        const rowData = row.original;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 ms-auto text-primary">
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
          </div>
        );
      }
    }
  ].filter(Boolean);
};

export default WhatsAppDataColumn;