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
import SelectDropdown from "@/components/input/selectDropdown";
import { cn } from "@/lib/utils";

const WorkOrderColumn = ({ actions, selectedRows, setSelectedRows }) => {
  const selectedRowsTotal = Object.values(selectedRows).length;
  const shouldShowActionsColumn = selectedRowsTotal === 0;

  return [
    {
      id: "select",
      size: 50,
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
      accessorKey: "workOrderNumber",
      header: () => <div className="whitespace-nowrap">WO No</div>,
      // size: 200,
    },
    {
      accessorKey: "name",
      header: () => <div className="whitespace-nowrap">Customer Name</div>,
      // size: 180,
      // cell: ({ row }) => {
      //   const value = row.getValue("customerName");
      //   return (
      //     <div className="w-20 truncate" title={value}>
      //       {value}
      //     </div>
      //   );
      // }
    },
    {
      accessorKey: "address",
      header: () => <div className="whitespace-nowrap">Address</div>,
      cell: ({ row }) => {
        const value = row.getValue("address");
        return (
          <div className="w-20 truncate" title={value}>
            {value}
          </div>
        );
      }
    },
    {
      accessorKey: "package",
      header: () => <div className="whitespace-nowrap">Package</div>,
      // size: 300,
    },
    {
      accessorKey: "schedule",
      header: () => <div className="whitespace-nowrap">Schedule</div>,
      cell: ({ row }) => {
        const value = row.getValue("schedule");
        return (
          <div className="w-20 truncate" title={value}>
            {value}
          </div>
        );
      }
    },
    {
      accessorKey: "Technician",
      header: () => <div className="whitespace-nowrap">Technician</div>,
      // size: 180,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status?.toLowerCase(); 
        const isActive = row.original.isActive;

        let variant = "default";

        if (status === "completed") {
          variant = "completed";
        } else if (status === "in progress") {
          variant = "in-progress";
        } else if (status === "scheduled") {
          variant = "scheduled";
        } else if (status === "requested") {
          variant = "default";
        } else {
          variant = isActive ? "outlined-active" : "outlined-inactive";
        }

        return (
          <Badge
            variant={variant}
            className={cn(
              "w-fit capitalize"
            )}
          >
            {row.original.status || (isActive ? "Active" : "Inactive")}
          </Badge>
        );
      }
    },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   header: "Action",
    //   cell: ({ row }) => {
    //     const rowData = row.original;

    //     return (
    //       <div className="flex justify-start items-center">
    //         {rowData.status === "Requested" ? (
    //           <Button
    //             size="sm"
    //             className="bg-primary hover:bg-hover-primary text-white text-xs h-8 px-4 rounded-md"
    //             onClick={() => console.log("Complete data clicked for:", rowData.id)}
    //           >
    //             Complete Data
    //           </Button>
    //         ) : (
    //           <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //               <Button variant="ghost" className="h-8 w-8 hover:bg-muted">
    //                 <MoreHorizontal className="h-4 w-4" />
    //               </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent align="start" className="border border-muted rounded-[8px] min-w-[150px]">
    //               {actions?.map((item, index) => {
    //                 const Icon = item?.icon;
    //                 return (
    //                   <div key={index}>
    //                     {item.label === "Delete" && <DropdownMenuSeparator />}
    //                     <DropdownMenuItem
    //                       onClick={() => item?.onClick(rowData)}
    //                       className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer"
    //                     >
    //                       {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
    //                       {item?.label}
    //                     </DropdownMenuItem>
    //                   </div>
    //                 );
    //               })}
    //             </DropdownMenuContent>
    //           </DropdownMenu>
    //         )}
    //       </div>
    //     );
    //   }
    // }
    {
      id: "actions",
      enableHiding: false,
      size: 80,
      header: "Action",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div>
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

export default WorkOrderColumn;