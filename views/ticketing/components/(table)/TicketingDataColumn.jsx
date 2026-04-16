"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import { cn } from "@/lib/utils";

const TicketingDataColumn = ({ actions }) => {
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
      accessorKey: "id",
      header: "Ticket",
      cell: ({ row }) => {
        return <div>{row.getValue("id")}</div>;
      },
    },
    {
      accessorKey: "author",
      header: "User",
      cell: ({ row }) => {
        return <div>{row.getValue("author")}</div>;
      },
    },
    {
      accessorKey: "assignee",
      header: "Assignee",
      size: 50,
      cell: ({ row }) => {
        const statusValue =
          row.original.assignee === "technical"
            ? "Technical"
            : row.original.assignee === "account-support"
              ? "Account Support"
              : row.original.assignee === "finance"
                ? "Finance"
                : row.original.assignee === "sales"
                  ? "Sales"
                  : row.original.assignee === "security"
                    ? "Security"
                    : "-";
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
              "outlined-none"
            }
            iconClassName={
              statusValue
            }
            sections={statusActions}
          />
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      size: 50,
      cell: ({ row }) => {
        const statusValue =
          row.original.category === "bug"
            ? "Bug"
            : row.original.category === "account"
              ? "Account"
              : row.original.category === "security"
                ? "Security"
                : row.original.category === "billing"
                  ? "Billing"
                  : row.original.category === "payment"
                    ? "Payment"
                    : row.original.category === "payment"
                      ? "Payment"
                      : row.original.catagory === "feature"
                        ? "Feature"
                        : row.original.category === "ux"
                          ? "UX"
                          : "-";
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
            badgeVariant={"outlined-slate"}
            iconClassName={statusValue}
            sections={statusActions}
          />
        );
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      size: 50,
      cell: ({ row }) => {
        const statusValue =
          row.original.priority === "high"
            ? "High"
            : row.original.priority === "medium"
              ? "Medium"
              : row.original.priority === "low"
                ? "Low"
                : "-";
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
              statusValue === "High"
                ? "outlined-red"
                : statusValue === "medium"
                  ? "outlined-yellow"
                  : "outlined-slate"
            }
            iconClassName={statusValue}
            sections={statusActions}
          />
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 50,
      cell: ({ row }) => {
        const statusValue =
          row.original.status === "open"
            ? "Open"
            : row.original.status === "in-progress"
              ? "Progress"
              : row.original.status === "resolved"
                ? "Resolved"
                : "-";
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
              statusValue === "Open"
                ? "outlined-yellow"
                : statusValue === "Progress"
                  ? "outlined-blue"
                  : statusValue === "Resolved"
                    ? "outlined-green"
                    : "outlined-slate"
            }
            iconClassName={statusValue}
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

export default TicketingDataColumn;
