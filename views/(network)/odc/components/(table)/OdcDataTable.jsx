"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus, Plus, PlusCircle, Search, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function OdcDataTable({ columns, handleModalOpen }) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const dummyData = [
    {
      area: "Bali",
      odcName: "ODC-DPS-01",
      bscName: "BSC-DPS-0A",
      popName: "POP-DPS-01",
      longitude_latitude: "40.741895,-73.989308",
      locationNotes: "Rooftop cabinet, inside data center",
      status: "Active",
    },
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

  // Fungsi pembuat section yang bisa diatur showBadge-nya
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
    <div className="flex flex-1 flex-col">
      {hasData ? (
        <div className="px-4 space-y-2 py-2">
          <div className="w-full">
            <Label className="font-semibold text-sm">
              Optical Distribution Point (ODP) Data
            </Label>
          </div>

          <div className="flex flex-nowrap items-center justify-start w-full gap-2 pt-0">
            <div className="relative w-md flex-shrink-0">
              <Input placeholder="Search" className="pr-10 h-9" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hidden-x">
              <div className="flex gap-2 max-w-xs overflow-x-auto scrollbar-hidden-x">
                <SelectDropdown
                  triggerLabel={renderLabelWithCount(
                    "Area/Region",
                    areaOptions.map((i) => i.value),
                  )}
                  asBadge={getActiveCount(areaOptions.map((i) => i.value)) > 0}
                  icon={CirclePlus}
                  iconPosition="left"
                  className="w-auto outline"
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
                    "POP",
                    areaOptions.map((i) => i.value),
                  )}
                  asBadge={getActiveCount(areaOptions.map((i) => i.value)) > 0}
                  icon={CirclePlus}
                  iconPosition="left"
                  className="w-auto outline"
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
                    "BSC",
                    areaOptions.map((i) => i.value),
                  )}
                  asBadge={getActiveCount(areaOptions.map((i) => i.value)) > 0}
                  icon={CirclePlus}
                  iconPosition="left"
                  className="w-auto outline"
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
                    "Status",
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
              </div>
              <CustomButton
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-none text-primary"
                onClick={handleResetAll}
              >
                Reset <X className="h-3.5 w-3.5 text-primary" />
              </CustomButton>

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
                Create
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
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50/50">
          <div className="space-y-4 max-w-xs">
            <Label className="text-xl font-bold">No ODC Cabinets Found</Label>
            <p className="text-sm text-muted-foreground">
              Bridge your backbone to the neighborhoods. Register an ODC to
              manage the splitters for your coverage area.
            </p>
            <CustomButton
              variant="primary"
              size="lg"
              onClick={() => handleModalOpen("add")}
              className="mt-4"
            >
              <Plus className="w-4 h-4" />
              Create ODC
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
