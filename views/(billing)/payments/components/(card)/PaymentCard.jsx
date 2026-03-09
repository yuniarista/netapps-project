"use client";

import { ChevronDown, ChevronUp, Search } from "lucide-react";
import List from "../(list)/PaymentList";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CustomButton from "@/components/button/customButton";
import IconifyIcon from "@/components/icon";

export default function PaymentCard({
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
  const [openSections, setOpenSections] = useState({
    allInvoice: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  return (
    <div className=" w-1/4 border-x min-h-screen">
      <div>
        <div className="relative w-md flex-shrink-0 p-3">
          <Input placeholder="Search" className="pr-10 h-9" />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
        <section>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => toggleSection("allInvoice")}
          >
            <h3 className="text-sm font-semibold p-3">All Invoice</h3>
            {openSections.allInvoice ? (
              <ChevronDown className="h-4 w-4 text-500" />
            ) : (
              <ChevronUp className="h-4 w-4 text-500" />
            )}
          </div>

          {openSections.allInvoice && <List />}
        </section>

        <CustomButton
          variant="primary"
          size="md"
          onClick={() => handleModalOpen("adds")}
        >
          <IconifyIcon icon="lucide:refresh-ccw-dot" />
          record payment
        </CustomButton>
      </div>
    </div>
  );
}
