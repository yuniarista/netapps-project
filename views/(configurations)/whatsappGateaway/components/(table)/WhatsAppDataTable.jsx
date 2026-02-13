"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import PageHeader from "@/components/pageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PanelRight, Plus, Search, Settings2, X } from "lucide-react";

export default function WhatsAppDataTable({ columns, handleModalOpen }) {
  const dummyData = [
    {
      name: "SAI",
      number: "+62 812-3456-7890",
      messageQuota: "1000/mo",
      ussage: "250",
      status: "Active",
    },
    {
      name: "PT Maju Mundur",
      number: "+62 813-9876-5432",
      messageQuota: "500/mo",
      ussage: "100",
      status: "Inactive",
    },
    {
      name: "PT Sukses Selalu",
      number: "+62 811-2345-6789",
      messageQuota: "2000/mo",
      ussage: "50",
      status: "Active",
    },
  ];

  const hasData = dummyData.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      {hasData ? (
        <>
          <div className="p-4 space-y-4">
            <div className="w-full">
              <Label className="font-semibold text-md">Message Templates</Label>
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
            </div>

            <div className="pt-2">
              <DataTableComponent
                columns={columns}
                data={{
                  data: dummyData,
                  totalData: dummyData.length
                }}
                pagination={false}
                withoutRowsSelected
                selectedRows={{}}
                setSelectedRows={() => { }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex  flex-col items-center justify-center text-center p-6">
          <div className="space-y-4 max-w-sm">
            <h2 className="text-xl font-semibold text-slate-900">No Invoice Template</h2>
            <p className="text-slate-500 max-w-sm">
              You haven't created any invoice template yet. <br />
              Go ahead and create your first one.
            </p>
            <CustomButton
              variant="primary"
              size="lg"
              onClick={() => handleModalOpen("add")}
              className="mt-4"
            >
              <Plus className="w-4 h-4" />
              Create invoice template
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
