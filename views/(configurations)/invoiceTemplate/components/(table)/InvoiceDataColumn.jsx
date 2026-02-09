import { Badge } from "@/components/ui-p/badge";
import { Checkbox } from "@/components/ui-p/checkbox";

const InvoiceDataColumn = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onChange={table.getToggleAllRowsSelectedHandler()}
        aria-label="Selected all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "name",
    header: "ISP Name",
  },
  {
    accessorKey: "templateName",
    header: "Template Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "default",
    header: "Default",
  },
  {
    accessorKey: "lastUpdate",
    header: "Last Update",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusValue = row.original.status;
      const isActive = statusValue === "Active";
      const variantMap = {
        true: "outlined-active",
        false: "outlined-inactive",
      };
      const variant = variantMap[isActive] || "outlined-inactive";
      return <Badge variant={variant}>{statusValue}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
  },
];

export default InvoiceDataColumn;
