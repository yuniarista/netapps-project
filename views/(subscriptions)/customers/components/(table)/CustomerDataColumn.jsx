import { Badge } from "@/components/ui-p/badge";
import { Checkbox } from "@/components/ui-p/checkbox";

const CustomerDataColumn = [
  {
    accessorKey: "name",
    header: "ISP Name",
  },
  {
    accessorKey: "legalName",
    header: "Legal Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Contact Person",
  },
  {
    accessorKey: "province",
    header: "Province",
  },
  {
    accessorKey: "city",
    header: "City",
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

export default CustomerDataColumn;
