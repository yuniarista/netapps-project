"use client";

import { ChevronDown, ChevronUp, Search, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CustomButton from "@/components/button/customButton";
import IconifyIcon from "@/components/icon";
import { Checkbox } from "@/components/ui/checkbox";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import PaymentList from "../(list)/PaymentList";
import InvoiceListData from "../(component)/InvoiceListData";

export default function InvoiceSection({
  uri,
  data,
  setData,
  columns,
  setLoading,
  handleModalOpen,
  filterParams,
  setFilterParams,
  selectedRows = [],
  setSelectedRows,
  nameFilter,
  setNameFilter,
  sortDataBy,
  setSortDataBy,
  paginationModel,
  setPaginationModel,
  dashboardAccessPermissions,
}) {
  const [openSections, setOpenSections] = useState({
    allInvoice: true,
  });
  const ListData = [{ id: 1 }, { id: 2 }];

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSelectAll = () => {
    if (selectedRows.length === ListData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(ListData.map((item) => item.id));
    }
  };

  const isBulkMode = selectedRows.length > 0;
  const bulkActionSections = [
    {
      items: [
        {
          label: "Export as PDF",
          value: "pdf",
          // onClick: () => handleAddFilter("Active", "active", true),
        },
        {
          label: "Export as ZIP (File)",
          value: "zip",
          // onClick: () => handleAddFilter("Inactive", "inactive", true),
        },
        {
          label: "Mark as Sent",
          value: "sent",
          // onClick: () => handleAddFilter("Inactive", "inactive", true),
        },
      ],
    },
    {
      items: [
        {
          label: "Delete",
          value: "delete",
          icon: Trash2,
          onClick: () => handleModalOpen("delete")
        },
      ]
    }
  ];

  return (
    <div className="w-1/3 border-x min-h-screen">
      <div className="relative w-md flex-shrink-0 p-3">
        <Input placeholder="Search" className="pr-10 h-9" />
        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
      </div>

      <div className="flex items-center justify-between p-3 bg-white">
        {isBulkMode ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedRows.length === ListData.length}
                onCheckedChange={handleSelectAll}
              />
              <SelectDropdown
                triggerLabel="Bulk Action"
                sections={bulkActionSections}
                badgeVariant="outline"
              />
            </div>

            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{selectedRows.length} <span className="text-primary">selected</span></p>
              <button onClick={() => setSelectedRows([])} className="text-gray-400 hover:text-black">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div
            className="flex items-center cursor-pointer w-full"
            onClick={() => toggleSection("allInvoice")}
          >
            <h3 className="text-sm font-semibold">All Invoice</h3>
            {openSections.allInvoice ? (
              <ChevronUp className="h-4 w-4 ml-2 text-slate-500" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2 text-slate-500" />
            )}
          </div>
        )}
      </div>

      {openSections.allInvoice && (
        <section>
          <InvoiceListData selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
        </section>
      )}
    </div>

  );
}
