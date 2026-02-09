"use client";

import DataTableComponent from "@/components/data-table-p/DataTableComponent";
import { Badge } from "@/components/ui-p/badge";
import { Button } from "@/components/ui-p/button";
import { Checkbox } from "@/components/ui-p/checkbox";
import { Plus } from "lucide-react";
import { check } from "zod";
import { id } from "zod/v4/locales";

export default function CustomerDataTable({ columns, handleModalOpen }) {
  const dummyData = [
    {
      name: "NetApps",
      legalName: "NetApps Indonesia",
      email: "contact@netapps.id",
      phone: "021-12345678",
      invoiceNumber: "INV-001",
      province: "DKI Jakarta",
      city: "Jakarta Selatan",
      status: "Active",
    },
    {
      name: "PT Maju Mundur",
      legalName: "PT Maju Mundur Sejahtera",
      email: "info@maju-mundur.co.id",
      phone: "021-87654321",
      invoiceNumber: "INV-002",
      province: "Jawa Barat",
      city: "Bandung",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-end py-3 justify-between">
        <h1 className="text-xl font-semibold py-1">Customer List</h1>
        <Button
          onClick={() => handleModalOpen("add")}
          type="create"
          variant="primary"
        >
          <Plus />
          Create
        </Button>
      </div>

      <div className="">
        <DataTableComponent
          columns={columns}
          data={dummyData}
          pagination={{ pageIndex: 0, pageLimit: 10 }}
        />
      </div>
    </div>
  );
}
