"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import PageHeader from "@/components/pageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, PanelRight, Plus, Search, Settings2, Trash2 } from "lucide-react";

export default function DocumentDataTable({ 
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
  const dummyData = [
    {
      id:"1",
      name: "NetApps",
      templateName: "Invoice SAI",
      description: "Instalation Fee",
      default: "yes",
      lastUpdate: "03 Feb 2025",
      status: "Active",
    },
    {
      id:"2",
      name: "PT Maju Mundur",
      templateName: "Invoice A",
      description: "tes",
      default: "yes",
      lastUpdate: "03 Feb 2025",
      status: "Inactive",
    },
    {
      id:"3",
      name: "CV Sukses Selalu",
      templateName: "Invoice A",
      description: "tes",
      default: "yes",
      lastUpdate: "03 Feb 2025",
      status: "Inactive",
    },
  ];

const filterSections = [
  {
    label: "Area",
    type: "checkbox",
    items: [
      { label: "Bali", value: "bali", checked: true, onClick: (v) => console.log("Toggle area:", v) },
      { label: "Jawa", value: "jawa", checked: false, onClick: (v) => console.log("Toggle area:", v) },
      { label: "Sumatera", value: "sumatera", checked: false, onClick: (v) => console.log("Toggle area:", v) },
    ]
  },
  {
    label: "Category",
    type: "checkbox",
    items: [
      { label: "Business", value: "biz", onClick: (v) => console.log("Selected cat:", v) },
      { label: "Professional", value: "prof", onClick: (v) => console.log("Selected cat:", v) },
      { label: "Home", value: "home", onClick: (v) => console.log("Selected cat:", v) },
    ]
  }
];

  const bulkActionSections = [
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

  const hasData = dummyData.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        icon={<PanelRight className="w-4 h-4 text-gray-600" />}
        title="Document Template"
      />

      {hasData ? (
        <>
          <div className="p-4 space-y-4">
            <div className="w-full">
              <Label className="font-semibold text-md">Document Template</Label>
            </div>

            <div className="flex items-center justify-between w-full gap-4 pt-0">
              <div className="relative w-full max-w-xs">
                <Input
                  placeholder="Search"
                  className="pr-10"
                // value={nameFilter}
                // onChange={(e) => setNameFilter(e.target.value)}
                />
                <Search
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                />
              </div>

              <div className="ml-auto flex flex-nowrap items-center gap-2 flex-shrink-0">
                <div className="flex flex-nowrap gap-2">
                  {/* {activeFilters
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
                    ))} */}
                </div>
                {/* <Select>
                  <SelectTrigger className="w-40" iconClassName="text-primary">
                    <SelectValue placeholder="Bulk Delete" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="delete">Delete Selected</SelectItem> */}
                {/* </SelectContent>
                </Select> */}

                <SelectDropdown
                  triggerLabel="Filter By"
                  icon={Settings2}
                  iconPosition="left"
                  sections={filterSections}
                  badgeVariant="outline"
                />
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
                  totalData: dummyData.length
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
            <h2 className="text-xl font-semibold text-slate-900">No Document Template</h2>
            <p className="text-slate-500 max-w-sm">
              You haven't created any document template yet. <br />
              Go ahead and create your first one.
            </p>
            <CustomButton
              variant="primary"
              size="lg"
              onClick={() => handleModalOpen("add")}
              className="mt-4"
            >
              <Plus className="w-4 h-4" />
              Create Document template
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
