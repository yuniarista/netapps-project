"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import PageHeader from "@/components/pageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function TicketingDataTable({
  uri,
  columns,
  handleModalOpen,
  data,
  setPaginationModel,
  paginationModel,
}) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const getFilterParams = (name) => [{ key: "search", value: name }];


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

  // const hasData = dummyData.length > 0;

  return (
    <div className="flex flex-col h-screen">
        <div className="px-4 space-y-2 py-2">
          <div className="pt-2 py-1">
            <Label className="font-medium text-foreground text-base">
              Tickets
            </Label>
            <DataTableComponent
              uri={uri}
              columns={columns}
              sorting={sorting}
              setSorting={setSorting}
              data={data}
              filterParams={getFilterParams(nameFilter)}
              selectedRows={rowSelection}
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
              setSelectedRows={setRowSelection}
              pagination={paginationModel}
              setPagination={setPaginationModel}
              filterComponent={{
                startAdornment: (
                  <div className="w-full flex items-center space-x-4">
                    <Input
                      placeholder="Filter by name..."
                      value={nameFilter}
                      onChange={(e) => {
                        setNameFilter(e.target.value);
                      }}
                      className="max-w-xs"
                    />
                    <div className="flex flex-nowrap items-center p-2 gap-2">
                      <div className="flex gap-2 max-w-48 overflow-x-auto scrollbar-hidden-x">
                        <SelectDropdown
                          triggerLabel={renderLabelWithCount(
                            "Status",
                            areaOptions.map((i) => i.value),
                          )}
                          asBadge={
                            getActiveCount(areaOptions.map((i) => i.value)) > 0
                          }
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
                                  !areaOptions
                                    .map((i) => i.value)
                                    .includes(f.value),
                              ),
                            )
                          }
                        />

                        <SelectDropdown
                          triggerLabel={renderLabelWithCount(
                            "Category",
                            areaOptions.map((i) => i.value),
                          )}
                          asBadge={
                            getActiveCount(areaOptions.map((i) => i.value)) > 0
                          }
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
                                  !areaOptions
                                    .map((i) => i.value)
                                    .includes(f.value),
                              ),
                            )
                          }
                        />

                        <SelectDropdown
                          triggerLabel={renderLabelWithCount(
                            "Priority",
                            areaOptions.map((i) => i.value),
                          )}
                          asBadge={
                            getActiveCount(areaOptions.map((i) => i.value)) > 0
                          }
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
                                  !areaOptions
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
                  </div>
                ),
                endAdornment: (
                  <div className="w-50 flex justify-end items-center space-x-4">
                    <SelectDropdown
                      triggerLabel="Bulk Action"
                      sections={bulkActionSections}
                      badgeVariant="outline"
                    />
                  </div>
                ),
              }}
            />
          </div>
        </div>
    </div>
  );
}
