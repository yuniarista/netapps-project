"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Trash2, X, CirclePlus, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import { useState } from "react";

export default function InvoiceDataTable({ columns, handleModalOpen }) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const dummyData = [
    {
      id: "1",
      customerName: "Putu Harun",
      cid: "C001",
      noInvoice: "INV001",
      billingPeriod: "01/02/26-01/03/26",
      dueDate: "06/03/2026",
      ppn: "-",
      amount: "Rp100000",
      status: "Paid",
      customerStatus: "Active"
    },
    
  ];

  const handleToggleFilter = (label, value, showBadge = true) => {
    setActiveFilters((prev) => {
      const isExist = prev.find((f) => f.value === value);

      if (isExist) {
        return prev.filter((f) => f.value !== value);
      } else {
        return [...prev, { label, value, showBadge }];
      }
    });
  };

  const handleAddFilter = (label, value) => {
    if (!activeFilters.find((f) => f.value === value)) {
      setActiveFilters([...activeFilters, { label, value, showBadge: true }]);
    }
  };

  const handleRemoveFilter = (value) => {
    setActiveFilters(activeFilters.filter((f) => f.value !== value));
  };

  const getActiveCount = (values) => {
    return activeFilters.filter((f) => values.includes(f.value)).length;
  };

  const renderLabelWithCount = (title, values) => {
    const count = getActiveCount(values);
    if (count === 0) return title;

    return (
      <div className="flex items-center gap-2">
        <span className="text-slate-900">{title}</span>
        <div className="w-[1px] h-3 bg-slate-200 mx-0.5" />
        <span className="font-normal">{count} Item</span>
      </div>
    );
  };

  const areaOptions = [
    { label: "Bali", value: "bali" },
    { label: "Jawa", value: "jawa" },
    { label: "Sumatera", value: "sumatera" },
  ];

  const categoryOptions = [
    { label: "Residential", value: "residential" },
    { label: "Business", value: "business" },
  ];

  const subCategoryOptions = [
    { label: "Tess", value: "tes" },
    { label: "SubCategri 2", value: "subcategory" },
  ];

  const generateFilterSection = (options, showBadge = true) => [
    {
      type: "checkbox",
      items: options.map((item) => ({
        ...item,
        checked: activeFilters.some((f) => f.value === item.value),
        onClick: () => handleToggleFilter(item.label, item.value, showBadge),
      })),
    },
  ];

  const handleResetAll = () => {
    setActiveFilters([]);
  };

  const bulkActionSections = [
    {
      label: "Change Status",
      items: [
        {
          label: "Mark as active",
          value: "active",
          onClick: () => handleAddFilter("Active", "active", true),
        },
        {
          label: "Mark as non active",
          value: "inactive",
          onClick: () => handleAddFilter("Inactive", "inactive", true),
        },
      ],
    },
    {
      items: [
        {
          label: "Delete",
          value: "delete",
          icon: Trash2,
          variant: "destructive",
          // onClick: () => confirm("Are you sure?"),
        },
      ],
    },
  ];

  const hasData = dummyData.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      {hasData ? (
        <div className="px-4 space-y-2 py-2">
          <CustomButton
            variant="primary"
            size="md"
            onClick={() => handleModalOpen("add")}
          >
            <IconifyIcon icon="lucide:plus" />
            Create Invoice
          </CustomButton>
          <div className="w-full">
            <Label className="font-semibold text-sm">Invoice Data</Label>
          </div>

          <div className="flex flex-nowrap items-center justify-start w-full gap-2 pt-0">
            <div className="relative w-md flex-shrink-0">
              <Input placeholder="Search" className="pr-10 h-9" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hidden-x">
              <div className="flex flex-nowrap gap-2">
                <SelectDropdown
                  triggerLabel={renderLabelWithCount(
                    "Area",
                    areaOptions.map((i) => i.value),
                  )}
                  asBadge={getActiveCount(areaOptions.map((i) => i.value)) > 0}
                  icon={CirclePlus}
                  iconPosition="left"
                  className="w-auto"
                  showSearch
                  showClear
                  borderType="dashed"
                  badgeVariant="outline"
                  sections={generateFilterSection(areaOptions, false)}
                  onClear={() =>
                    setActiveFilters((prev) =>
                      prev.filter(
                        (f) =>
                          !areaOptions.map((i) => i.value).includes(f.value),
                      ),
                    )
                  }
                />

                <SelectDropdown
                  triggerLabel={renderLabelWithCount(
                    "Category",
                    categoryOptions.map((i) => i.value),
                  )}
                  asBadge={
                    getActiveCount(categoryOptions.map((i) => i.value)) > 0
                  }
                  sections={generateFilterSection(categoryOptions, false)}
                  icon={CirclePlus}
                  iconPosition="left"
                  className="w-auto"
                  showSearch
                  showClear
                  borderType="dashed"
                  badgeVariant="outline"
                  onClear={() =>
                    setActiveFilters((prev) =>
                      prev.filter(
                        (f) =>
                          !categoryOptions
                            .map((i) => i.value)
                            .includes(f.value),
                      ),
                    )
                  }
                />

                <SelectDropdown
                  triggerLabel={renderLabelWithCount(
                    "Sub Category",
                    subCategoryOptions.map((i) => i.value),
                  )}
                  asBadge={
                    getActiveCount(subCategoryOptions.map((i) => i.value)) > 0
                  }
                  sections={generateFilterSection(subCategoryOptions, false)}
                  icon={CirclePlus}
                  iconPosition="left"
                  className="w-auto"
                  showSearch
                  showClear
                  borderType="dashed"
                  badgeVariant="outline"
                  onClear={() =>
                    setActiveFilters((prev) =>
                      prev.filter(
                        (f) =>
                          !subCategoryOptions
                            .map((i) => i.value)
                            .includes(f.value),
                      ),
                    )
                  }
                />

                <CustomButton
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 border-none text-primary"
                  onClick={handleResetAll}
                >
                  Reset <X className="h-3.5 w-3.5 text-primary" />
                </CustomButton>
              </div>

              <div className="flex flex-nowrap gap-2">
                {activeFilters
                  .filter((filter) => filter.showBadge === true)
                  .map((filter) => (
                    <CustomButton
                      key={filter.value}
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-1 whitespace-nowrap flex-shrink-0 h-8 rounded-full bg-slate-100 border-none px-3"
                      onClick={() => handleRemoveFilter(filter.value)}
                    >
                      <span className="text-[13px] text-slate-700">
                        {filter.label}
                      </span>
                      <X className="h-3.5 w-3.5 text-primary" />
                    </CustomButton>
                  ))}
              </div>
            </div>

            <div className="ml-auto flex flex-nowrap items-center gap-2 flex-shrink-0">
              <SelectDropdown
                triggerLabel="Bulk Action"
                sections={bulkActionSections}
                badgeVariant="outline"
              />
              <CustomButton
                variant="primary"
                size="md"
                onClick={() => handleModalOpen("add")}
              >
                <IconifyIcon icon="lucide:plus" />
                Create Invoice
              </CustomButton>
            </div>
          </div>

          <div className="pt-2 py-1">
            <DataTableComponent
              columns={columns}
              data={{ data: dummyData, totalData: dummyData.length }}
              selectedRows={rowSelection}
              setSelectedRows={setRowSelection}
              pagination={{ pageIndex: 0, pageLimit: 10 }}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex-1 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4 text-center">
            <Label className="text-lg">No Catalog Product</Label>
            <p className="text-sm text-muted-foreground">
              You haven’t created any product yet.
              <br /> Go a head and create your first one.
            </p>
            <CustomButton
              variant="primary"
              className="flex gap-2"
              onClick={() => handleModalOpen("add")}
            >
              <Plus className="w-4 h-4" /> Setup Network
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
