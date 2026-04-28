"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import SelectFilter from "@/components/inputcopy/selectFilter";
import PageHeader from "@/components/pageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  CirclePlus,
  PanelRight,
  Plus,
  Search,
  Settings2,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

export default function InHouseDataTable({
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
      name: "Name Affiliate",
      email: "admin@gmail.com",
      position: "Programmer",
      division: "Developer",
      level: "Staff",
      status: "Active",
    },
  ];

  const bulkActionSections = [
    {
      items: [
        {
          label: "Delete",
          value: "delete",
          icon: Trash2,
          onClick: () => handleModalOpen("delete"),
        },
      ],
    },
  ];

  const levelOptions = [
    { label: "Staff", value: "staff" },
    { label: "Director", value: "director" },
    { label: "Manager", value: "manager" },
  ];
  const divisionOptions = [
    { label: "Developer", value: "developer" },
    { label: "Sales", value: "sales" },
    { label: "Marketing", value: "marketing" },
  ];

  const handleRemoveFilter = (value) => {
    setActiveFilters(activeFilters.filter((f) => f.value !== value));
  };

  const handleResetAll = () => {
    setSelectedSegments([]);
    setSelectedStatus([]);
  };

  const hasData = dummyData.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        icon={<PanelRight className="w-4 h-4 text-gray-600" />}
        title="Inhouse Sales"
      />

      {hasData ? (
        <>
          <div className="p-4 space-y-4">
            <div className="w-full">
              <Label className="font-semibold text-md">Inhouse Sales</Label>
            </div>

            <div className="flex flex-nowrap items-center justify-start w-full gap-2 pt-0">
              <div className="relative w-md flex-shrink-0">
                <Input placeholder="Search" className="pr-10 h-9" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hidden-x">
                <div className="flex flex-nowrap gap-2">
                  <SelectFilter
                    label="Position"
                    options={divisionOptions}
                    selected={selectedSegments}
                    onChange={setSelectedSegments}
                    icon={CirclePlus}
                    showSearch
                  />

                  <SelectFilter
                    label="Division"
                    options={divisionOptions}
                    selected={selectedStatus}
                    onChange={setSelectedStatus}
                    icon={CirclePlus}
                    showSearch
                  />
                  <SelectFilter
                    label="Level"
                    options={levelOptions}
                    selected={selectedStatus}
                    onChange={setSelectedStatus}
                    icon={CirclePlus}
                    showSearch
                  />

                  {(selectedSegments.length > 0 ||
                    selectedStatus.length > 0) && (
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

            <div className="pt-2">
              <DataTableComponent
                columns={columns}
                data={{
                  data: dummyData,
                  totalData: dummyData.length,
                }}
                pagination={{ pageIndex: 0, pageLimit: 10 }}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex  flex-col items-center justify-center text-center p-6">
          <div className="space-y-4 max-w-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              No InHouse Sales Data
            </h2>
            <p className="text-slate-500 max-w-sm">
              You haven’t created any inhouse sales yet. <br />
              Go a head and create your first one.
            </p>
            <CustomButton
              variant="primary"
              size="lg"
              onClick={() => handleModalOpen("add")}
              className="mt-4"
            >
              <Plus className="w-4 h-4" />
              Create InHouse Sales
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
