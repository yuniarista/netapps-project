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
import SelectFilter from "@/components/inputcopy/selectFilter";

export default function ProductDataTable({
  uri,
  data,
  setData,
  columns,
  setLoading,
  handleModalOpen,
  filterParams,
  setFilterParams,
  selectedRows,
  setSelectedRows,
  nameFilter,
  setNameFilter,
  sortDataBy,
  setSortDataBy,
  paginationModel,
  setPaginationModel,
  dashboardAccessPermissions,
}) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const dummyData = [
    {
      id: "1",
      productName: "Bisnis Soho 30 Mbps",
      price: "120,000.00",
      areaCategory: "Urban",
      category: "Residential",
      subCategory: "Basic",
      promoPrice: "100,000.00",
      status: "Active",
    },
    {
      id: "2",
      productName: "Bisnis Soho 30 Mbps",
      price: "120,000.00",
      areaCategory: "Urban",
      category: "Residential",
      subCategory: "Basic",
      promoPrice: "100,000.00",
      status: "Inactive",
    },
  ];

  const handleAddFilter = (label, value) => {
    if (!activeFilters.find((f) => f.value === value)) {
      setActiveFilters([...activeFilters, { label, value, showBadge: true }]);
    }
  };

  const handleRemoveFilter = (value) => {
    setActiveFilters(activeFilters.filter((f) => f.value !== value));
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

  const handleResetAll = () => {
    setSelectedSegments([]);
    setSelectedStatus([]);
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
    <div className="flex flex-1 flex-col">
      {hasData ? (
        <div className="px-4 space-y-2 py-2">
          <div className="w-full">
            <Label className="font-semibold text-sm">
              Catalog Product Data
            </Label>
          </div>

          <div className="flex flex-nowrap items-center justify-start w-full gap-2 pt-0">
            <div className="relative w-md flex-shrink-0">
              <Input placeholder="Search" className="pr-10 h-9" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hidden-x">
              <div className="flex flex-nowrap gap-2">
                <SelectFilter
                  label="Area"
                  options={areaOptions}
                  selected={selectedSegments}
                  onChange={setSelectedSegments}
                  icon={CirclePlus}
                  showSearch
                />

                <SelectFilter
                  label="Category"
                  options={categoryOptions}
                  selected={selectedStatus}
                  onChange={setSelectedStatus}
                  icon={CirclePlus}
                  showSearch
                />
                <SelectFilter
                  label="Sub Category"
                  options={subCategoryOptions}
                  selected={selectedStatus}
                  onChange={setSelectedStatus}
                  icon={CirclePlus}
                  showSearch
                />

                {(selectedSegments.length > 0 || selectedStatus.length > 0) && (
                  <CustomButton
                    variant="ghost"
                    size="sm"
                    className="text-primary h-9"
                    onClick={handleResetAll}
                  >
                    Reset <X className="h-3 w-3" />
                  </CustomButton>
                )}
              </div>
            </div>

            <div className="ml-auto flex flex-nowrap items-center gap-2 flex-shrink-0">
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
                Create
              </CustomButton>
            </div>
          </div>

          <div className="pt-2 py-1">
            <DataTableComponent
              columns={columns}
              data={{ data: dummyData, totalData: dummyData.length }}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              pagination={{ pageIndex: 0, pageLimit: 10 }}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50/50">
          <div className="space-y-4 max-w-xs">
            <Label className="text-xl font-bold">No Catalog Product</Label>
            <p className="text-sm text-muted-foreground">
              You haven’t created any product yet.
              <br /> Go a head and create your first one.
            </p>
            <CustomButton
              variant="primary"
              size="lg"
              onClick={() => handleModalOpen("add")}
              className="mt-4"
            >
              <Plus className="w-4 h-4" />
              Create Product
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
