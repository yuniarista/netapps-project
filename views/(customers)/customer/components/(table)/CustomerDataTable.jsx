"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import { DateRangePicker } from "@/components/datePicker/rangeDatePicker";
import IconifyIcon from "@/components/icon";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import SelectFilter from "@/components/inputcopy/selectFilter";
import PageHeader from "@/components/pageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, CirclePlus, PanelRight, Plus, Search, Settings2, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function CustomerDataTable({
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
  dashboardAccessPermissions
}) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const dummyData = [
    {
      name: "NetApps",
      companyName: "NetApps",
      email: "netapps@netapps.com",
      customerSegment: "Home",
      orderDate: "03-02-2025",
      homepass: "Jl. Merdeka No. 123, Jakarta",
      status: "Active",
    },];

  // const filterSections = [
  //   {
  //     label: "Customer Segment",
  //     items: [
  //       { label: "Home", value: "home", checked: true, onClick: (v) => console.log("Toggle area:", v) },
  //       { label: "Villas", value: "villas", checked: false, onClick: (v) => console.log("Toggle area:", v) },
  //       { label: "Hospital", value: "hospital", checked: false, onClick: (v) => console.log("Toggle area:", v) },
  //     ]
  //   },
  //   {
  //     label: "Customer Status",
  //     items: [
  //       { label: "Requested", value: "requested", onClick: (v) => console.log("Selected status:", v) },
  //       { label: "Actived", value: "active", onClick: (v) => console.log("Selected status:", v) },
  //       { label: "Suspended", value: "suspended", onClick: (v) => console.log("Selected status:", v) },
  //     ]
  //   }
  // ];

  const segmentOptions = [
    { label: "Home", value: "bali" },
    { label: "Bussiness", value: "jawa" },
  ];

  const statusOptions = [
    { label: "Active", value: "tes" },
    { label: "Inactive", value: "subcategory" },
  ];

  const bulkActionSections = [
    {
      label: "Change Status",
      items: [
        {
          label: "Mark as active",
          value: "Active",
          onClick: () => handleAddFilter("Active", "Isolir", "Dismantle", true),
        },
        {
          label: "Mark as non Isolir",
          value: "Isolir",
          onClick: () => handleAddFilter("Active", "Isolir", "Dismantle", true),
        },
        {
          label: "Mark as Dismantle",
          value: "Dismantle",
          onClick: () => handleAddFilter("Active", "Isolir", "Dismantle", true),
        },
      ]
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

  const handleToggleFilter = (label, value, showBadge = true) => {
    setActiveFilters((prev) => {
      const isExist = prev.find((f) => f.value === value);

      if (isExist) {
        return prev.filter((f) => f.value !== value);
      } else {
        // Menyimpan status apakah filter ini harus muncul sebagai button tambahan atau tidak
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

  // const getActiveCount = (values) => {
  //   return activeFilters.filter((f) => values.includes(f.value)).length;
  // };

  // const renderLabelWithCount = (title, values) => {
  //   const count = getActiveCount(values);
  //   if (count === 0) return title;

  //   return (
  //     <div className="flex items-center gap-2">
  //       <span className="text-slate-900">{title}</span>
  //       <div className="w-[1px] h-3 bg-slate-200 mx-0.5" />
  //       <span className="font-normal">{count} Item</span>
  //     </div>
  //   );
  // };

  // const generateFilterSection = (options, showBadge = true) => [
  //   {
  //     type: "checkbox",
  //     items: options.map((item) => ({
  //       ...item,
  //       checked: activeFilters.some((f) => f.value === item.value),
  //       onClick: () => handleToggleFilter(item.label, item.value, showBadge),
  //     })),
  //   },
  // ];

  const handleResetAll = () => {
    setSelectedSegments([]);
    setSelectedStatus([]);
  };

  const hasData = dummyData.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      {hasData ? (
        <>
          <div className="flex flex-col min-h-screen p-4 space-y-4">
            <div className="w-full">
              <Label className="font-semibold text-md">Customers</Label>
            </div>

            <div className="flex flex-nowrap items-center justify-start w-full gap-2 pt-0">
              <div className="relative w-md flex-shrink-0">
                <Input placeholder="Search" className="pr-10 h-9" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hidden-x">
                <div className="flex flex-nowrap gap-2">
                  <SelectFilter
                    label="Customer Segment"
                    options={segmentOptions}
                    selected={selectedSegments}
                    onChange={setSelectedSegments}
                    icon={CirclePlus}
                    showSearch
                  />

                  <SelectFilter
                    label="Status"
                    options={statusOptions}
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
        </>
      ) : (
        <div className="flex-1 flex  flex-col items-center justify-center text-center p-6">
          <div className="space-y-4 max-w-sm">
            <h2 className="text-xl font-semibold text-slate-900">No Customers</h2>
            <p className="text-slate-500 max-w-sm">
              You haven't created any customers yet. <br />
              Go ahead and create your first one.
            </p>
            <CustomButton
              variant="primary"
              size="lg"
              onClick={() => handleModalOpen("add")}
              className="mt-4"
            >
              <Plus className="w-4 h-4" />
              Create Customer
            </CustomButton>
          </div>
        </div>
      )
      }
    </div >
  );
}
