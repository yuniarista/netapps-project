"use client";

import { StepperAlert } from "@/components/alert/stepperAlert";
import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import { DateRangePicker } from "@/components/datePicker/rangeDatePicker";
import IconifyIcon from "@/components/icon";
import SelectDropdown from "@/components/input/selectDropdown";
import SelectFilter from "@/components/input/selectFilter";
import { OnboardingStepper } from "@/components/stepper/OnboardingStepper";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stepper_config } from "@/constants/data";
import { useStepperData } from "@/hooks/use-stepper-data";
import { cn } from "@/lib/utils";
import StatsInvoice from "@/views/(billing)/invoices/components/(component)/StatsInvoice";
import { Bell, Calendar, Check, ChevronDown, CirclePlus, PanelRight, Plus, Search, Settings2, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import StatsOrders from "../(components)/StatsOrders";

export default function WorkOrderTable({
  uri,
  // data,
  // setData,
  columns,
  setLoading,
  handleModalOpen,
  setFilterParams,
  paginationModel,
  setPaginationModel,
  selectedRows,
  setSelectedRows,
  dashboardAccessPermissions
}) {
  const [sorting, setSorting] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [activeStep, setActiveStep] = useState(5);
  const [date, setDate] = useState({ from: undefined, to: undefined });


  const { currentStepData, loadStepData, isLoading } = useStepperData(stepper_config);

  const getFilterParams = (name, sort) => [
    { key: "search", value: name },
    // {
    //   key: !!sort ? `order[${sort.split("-")[0]}]` : "",
    //   value: sort.split("-")[1] ?? ""
    // }
  ];

  const [data, setData] = useState({
    data: [
      {
        id: "1",
        workOrderNumber: "WO/2024/001",
        name: "Budi Santoso",
        address: "Jl. Fatmawati No. 12, Jakarta Selatan",
        package: "Internet + TV (50 Mbps)",
        schedule: "2024-03-25 10:00",
        Technician: "Agus Prayogo",
        isActive: true,
        status: "Completed"
      },
      {
        id: "2",
        workOrderNumber: "WO/2024/002",
        name: "Siti Aminah",
        address: "Uluwatu Residence Blok C/05, Denpasar",
        package: "Internet Only (100 Mbps)",
        schedule: "2024-03-26 14:00",
        Technician: "I Wayan Putra",
        isActive: true,
        status: "In Progress"
      },
      {
        id: "3",
        workOrderNumber: "WO/2024/003",
        name: "Andi Tech",
        address: "Dago Hills Kav. 2, Bandung",
        package: "Internet Only (30 Mbps)",
        schedule: "2024-03-27 09:00",
        Technician: "Rizky Ramadhan",
        isActive: false,
        status: "Scheduled"
      },
    ]
  });

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

  const handleResetAll = () => {
    setSelectedSegments([]);
    setSelectedStatus([]);
  };

  useEffect(() => {
    loadStepData(activeStep - 1);
  }, [activeStep, loadStepData]);

  useEffect(() => {
    setData(data);
  }, [data, setData]);
  const hasData = data?.data && data.data.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      {hasData ? (
        <>
          <OnboardingStepper
            currentStep={activeStep}
            showRadioGroup={false}
            contentHeight="h-[180px]"
          />

          <div className="flex flex-col p-4 border-b space-y-4">
            <div className="flex flex-row justify-between items-start">
              <div className="space-y-1">
                <Label className="font-semibold text-lg">Work Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Track and manage all work orders in one place, including their status, progress, and assigned technicians
                </p>
              </div>

              <div className="flex-shrink-0">
                <DateRangePicker
                  date={date}
                  handleSelect={setDate}
                  placeHolder="select date range"
                />
              </div>
            </div>

            <div className="w-full">
              <StatsOrders />
            </div>
          </div>

          {/* <StepperAlert
            currentStep={activeStep}
            dataCount={currentStepData?.data?.length || currentStepData?.length || 0}
            oldestWaiting={currentStepData?.oldest_waiting}
            isLoading={isLoading}
          /> */}

          <div className="px-4 pt-4">
            {/* <StepperAlert
              currentStep={1}
              dataCount={5}
              oldestWaiting="10 mins ago"
              isLoading={false}
            /> */}
            <StepperAlert
              currentStep={1}
              dataCount={10}
              isLoading={false}
              onViewAll={() => {
                handleModalOpen("unassign");
              }}
            />
          </div>

          <div className="flex flex-col px-4 space-y-2">
            <div className="w-full">
              <Label className="font-semibold text-md">Work Orders List</Label>
            </div>

            <div className="pt-2">
              <DataTableComponent
                uri={uri}
                sorting={sorting}
                setSorting={setSorting}
                data={data}
                columns={columns}
                pagination={paginationModel}
                setPagination={setPaginationModel}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                filterParams={getFilterParams(nameFilter)}
                filterComponent={{
                  startAdornment: (
                    <div className="flex flex-nowrap items-center gap-2 w-full pb-4">

                      <div className="relative w-full max-w-sm">
                        <Input
                          placeholder="Filter by name..."
                          value={nameFilter}
                          onChange={(e) => setNameFilter(e.target.value)}
                          className="w-full pr-10"
                        />
                        <Search
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none"
                        />
                      </div>

                      <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hidden-x">
                        <div className="flex flex-nowrap items-center gap-2">
                          <SelectFilter
                            label="Date Range"
                            options={statusOptions}
                            selected={selectedStatus}
                            onChange={setSelectedStatus}
                            icon={Calendar}
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
                              className="text-primary h-9 whitespace-nowrap"
                              onClick={handleResetAll}
                            >
                              Reset <X className="ml-1 h-3 w-3" />
                            </CustomButton>
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                  endAdornment: (
                    <div className="flex justify-end items-center space-x-2 pb-4">
                      <SelectDropdown
                        triggerLabel="Bulk Action"
                        sections={bulkActionSections}
                        showSectionLabelSeparator={false}
                        showSectionSeparator={false}
                        badgeVariant="outline"
                      />
                      {/* {dashboardAccessPermissions.includes("write") && ( */}
                      {/* <CustomButton
                        variant="primary"
                        type="button"
                        size="md"
                        onClick={() => handleModalOpen("add")}
                      >
                        <IconifyIcon icon="lucide:plus" />
                        Create
                      </CustomButton> */}
                      {/* )} */}
                    </div>
                  )
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex  flex-col items-center justify-center text-center p-6">
          <div className="space-y-4 max-w-sm">
            <h2 className="text-xl font-semibold text-slate-900">No Customers</h2>
            <p className="text-slate-500 max-w-sm">
              You haven&apos;t created any customers yet. <br />
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
