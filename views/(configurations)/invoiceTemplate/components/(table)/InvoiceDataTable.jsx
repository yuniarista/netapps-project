"use client";

import DataTableComponent from "@/components/data-table-p/DataTableComponent";
import { Badge } from "@/components/ui-p/badge";
import { Button } from "@/components/ui-p/button";
import { Checkbox } from "@/components/ui-p/checkbox";
import { Plus } from "lucide-react";
import { check } from "zod";
import { id } from "zod/v4/locales";

export default function InvoiceDataTable({ columns, handleModalOpen }) {
  const dummyData = [
    {
      name: "NetApps",
      templateName: "Invoice SAI",
      description: "Instalation Fee",
      default: "yes",
      lastUpdate: "03 Feb 2025",
      status: "Active",
    },
    {
      name: "PT Maju Mundur",
      templateName: "Invoice A",
      description: "tes",
      default: "yes",
      lastUpdate: "03 Feb 2025",
      status: "Inactive",
    },
    {
      name: "CV Sukses Selalu",
      templateName: "Invoice A",
      description: "tes",
      default: "yes",
      lastUpdate: "03 Feb 2025",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-end py-3 justify-between">
        <h1 className="text-xl font-semibold py-1">Invoice List</h1>
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
