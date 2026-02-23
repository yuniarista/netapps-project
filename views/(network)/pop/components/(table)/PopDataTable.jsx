"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, PlusCircle, Search, Trash2 } from "lucide-react";

export default function PopData({ columns, handleModalOpen }) {
  const dummyData = [
    {
      area: "Bali",
      popName: "POP-DPS-01",
      longitude_latitude: "40.741895,-73.989308",
      locationNotes: "Rooftop cabinet, inside data center",
      status: "Active",
    },
  ];

  const filterSections = [
    {
      items: [
        {
          label: "Bali",
          value: "bali",
          checked: true,
          onClick: (v) => console.log("Toggle area:", v),
        },
        {
          label: "Bandung",
          value: "bandung",
          checked: false,
          onClick: (v) => console.log("Toggle area:", v),
        },
        {
          label: "Yogyakarta",
          value: "yogyakarta",
          checked: false,
          onClick: (v) => console.log("Toggle area:", v),
        },
      ],
    },
  ];

  const bulkActionSections = [
    {
      label: "Change Status",
      items: [
        {
          label: "Mark as active",
          value: "Active",
          onClick: (v) => handleStatusUpdate(rowId, v),
        },
        {
          label: "Mark as inactive",
          value: "Inactive",
          onClick: (v) => handleStatusUpdate(rowId, v),
        },
      ],
    },
    {
      items: [
        {
          label: "Delete",
          value: "delete",
          icon: Trash2,
          onClick: () => confirm("Are you sure?"),
        },
      ],
    },
  ];

  const hasData = dummyData.length > 0;

  return (
    <div className="flex flex-col flex-1">
      {hasData ? (
        <>
          <div className="p-4 space-y-4">
            <div className="w-full">
              <Label className="font-semibold text-md">
                POP (Point Of Presence) Data
              </Label>
            </div>

            <div className="flex items-center justify-between w-full gap-4 pt-0">
              <div className="flex gap-2">
                <div className="relative w-full max-w-xs">
                  <Input
                    placeholder="Search"
                    className="pr-10 focus-visible:ring-primary"
                    // value={nameFilter}
                    // onChange={(e) => setNameFilter(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
                <SelectDropdown
                  triggerLabel="Area/Region"
                  icon={PlusCircle}
                  iconPosition="left"
                  className="w-40 border-2 border-dashed"
                  sections={filterSections}
                  showSearch
                />
                <SelectDropdown
                  triggerLabel="Status"
                  icon={PlusCircle}
                  iconPosition="left"
                  className="w-40 border-2 border-dashed"
                  sections={bulkActionSections}
                />
              </div>

              <div className="flex items-center space-x-2">
                <SelectDropdown
                  triggerLabel="Bulk Action"
                  sections={bulkActionSections}
                />

                <CustomButton
                  variant="primary"
                  type="button"
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
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50/50">
          <div className="space-y-4 max-w-sm">
            <Label className="text-xl font-bold">No POP Sites Found</Label>
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
              Create POP
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
