"use client";
import CustomCard from "@/components/card/customCard";
import Card from "../(card)/InvoicesCard";
import { useState } from "react";
import { DateRangePicker } from "@/components/datePicker/rangeDatePicker";
import { Separator } from "@/components/ui/separator";
import InvoiceDataTable from "../(table)/InvoiceTable";

import CustomDialog from "@/components/dialog/basicDialog";
import { useInvoiceHooks } from "../../hooks/useInvoiceHooks";
import InvoiceDataColumn from "../(table)/InvoiceDataColumn";
import invoiceActionConfig from "../../configs/invoiceActionConfig";

export default function InvoicesPage() {
  const [date, setDate] = useState({ from: undefined, to: undefined });
  const {
    form,
    setForm,
    openModal,
    setOpenModal,
    modalType,
    setModalType,
    data,
    setData,
    response,
    setResponse,
    loading,
    setLoading,
    paginationModel,
    setPaginationModel,
    alertOpen,
    setAlertOpen,
    handleModalOpen,
    handleModalClose,
    selectedRows,
    setSelectedRows,
    filterParams,
    setFilterParams,
  } = useInvoiceHooks();

  const actions = invoiceActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete"],
  );
  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col space-y-1">
            <h1 className="">Billing Overview</h1>
            <p className="text-xs text-muted-foreground">
              A real-time summary of your current billing cycle's financial
              performance and collection status.
            </p>
          </div>
          <div className="">
            <DateRangePicker
              date={date}
              handleSelect={setDate}
              placeHolder="select date range"
            />
          </div>
        </div>
        <div>
          <Card />
        </div>
      </div>
      <Separator />

      <div>
        <InvoiceDataTable
          columns={InvoiceDataColumn({ actions, })}
          handleModalOpen={handleModalOpen}
        />
        <CustomDialog
          open={openModal}
          onOpenChange={handleModalClose}
          modalType={modalType}
          headerAlignment="start"
          titleClassname="text-xl p-3"
        />
      </div>
    </>
  );
}
