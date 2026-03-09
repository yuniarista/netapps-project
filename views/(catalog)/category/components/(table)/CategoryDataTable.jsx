"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import PageHeader from "@/components/pageHeader";
import CustomTabs from "@/components/tabs/CustomTabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  PanelRight,
  Plus,
  Search,
  Settings2,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import { selectRowsFn } from "@tanstack/react-table";

export default function CategoryDataTable({ columns, handleModalOpen}) {
  const [activeFilters, setActiveFilters] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
  const dummyData = [
    {
      categoryName: "Business",
      status: "Active",
    },
    {
      categoryName: "Professional",
      status: "Active",
    },
  ];

  const handleAddFilter = (label, value) => {
    if (!activeFilters.find((f) => f.value === value)) {
      setActiveFilters([...activeFilters, { label, value }]);
    }
  };

  const handleRemoveFilter = (value) => {
    setActiveFilters(activeFilters.filter((f) => f.value !== value));
  };
  const filterSections = [
    {
      label: "Status",
      items: [
        {
          label: "Active",
          value: "active",
          onClick: () => handleAddFilter("Active", "active"),
        },
        {
          label: "Inactive",
          value: "inactive",
          onClick: () => handleAddFilter("Inactive", "inactive"),
        },
      ],
    },
  ];

  const hasData = dummyData.length > 0;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col">
      {hasData ? (
        <>
          <div className="px-4 space-y-2 py-2">
            <div className="w-full">
              <Label className="font-semibold text-sm">Category Data</Label>
            </div>

            <div className="flex items-center justify-between w-full gap-4 pt-0">
              <div className="relative w-md">
                <Input
                  placeholder="Search"
                  className="pr-10"
                  // value={nameFilter}
                  // onChange={(e) => setNameFilter(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              <div className="flex items-center space-x-2">
                <Select>
                  {/* value={sortDataBy}
                    // onValueChange={async (val) => {
                    //   setSortDataBy(val);
                    //   setFilterParams([
                    //     { key: "search", value: nameFilter },
                    //     {
                    //       key: !!val ? `order[${val.split("-")[0]}]` : "",
                    //       value: val.split("-")[1] ?? ""
                    //     }
                    //   ]);
                    //   const result = await FilterData({
                    //     uri,
                    //     setLoading,
                    //     paginationModel: {
                    //       pageIndex: paginationModel.pageIndex + 1,
                    //       pageLimit: paginationModel.pageLimit
                    //     },
                    //     filterParams: getFilterParams(nameFilter, val)
                    //   });
                    //   setData(result);
                    // }} */}
                  <SelectDropdown
                    triggerLabel="Filter By"
                    icon={Settings2}
                    iconPosition="left"
                    sections={filterSections}
                    badgeVariant="outline"
                  />
                  <SelectContent>
                    {/* {sortableFieldList.map((item) => (
                        <SelectItem
                          key={item.label}
                          value={`${item.value.sortDataBy}-${item.value.sortType}`}
                        >
                          {item.label}
                        </SelectItem>
                      ))} */}
                  </SelectContent>
                </Select>

                {activeFilters.map((filter) => (
                  <CustomButton
                    key={filter.value}
                    variant="secondary"
                    type="button"
                    size="sm"
                    className="mt-1"
                    onClick={() => handleRemoveFilter(filter.value)}
                  >
                    {filter.label}
                    <X className="h-4 w-4 text-primary" />
                  </CustomButton>
                ))}

                <CustomButton
                  variant="primary"
                  type="button"
                  size="md"
                  onClick={() => handleModalOpen("addModal")}
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
                selectedRows={rowSelection}
                setSelectedRows={setRowSelection}
                pagination={{ pageIndex: 0, pageLimit: 10 }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50/50">
          <div className="space-y-4 max-w-xs">
            <Label className="text-xl font-bold">No Category</Label>
            <p className="text-sm text-muted-foreground">
              Your network backbone starts here. Create your first POP site to
              provide internet connectivity.
            </p>
            <CustomButton
              variant="primary"
              size="lg"
              onClick={() => handleModalOpen("add")}
              className="mt-4"
            >
              <Plus className="w-4 h-4" />
              Create Category
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
