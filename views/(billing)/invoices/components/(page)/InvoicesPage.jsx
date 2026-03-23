"use client";

import { useState } from "react";
import { DateRangePicker } from "@/components/datePicker/rangeDatePicker";
import { Separator } from "@/components/ui/separator";
import CustomDialog from "@/components/dialog/basicDialog";
import { useInvoiceHooks } from "../../hooks/useInvoiceHooks";
import InvoiceDataColumn from "../(table)/InvoiceDataColumn";
import invoiceActionConfig from "../../configs/invoiceActionConfig";
import { getModalConfig } from "@/utils/getModalConfig";
import { invoiceModalConfig } from "../../configs/invoiceModalConfig";
import InvoiceDataTable from "../(table)/InvoiceTable";
import { size } from "zod";
import StatsInvoice from "../(component)/StatsInvoice";

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

  const modalConfig = getModalConfig(
    modalType,
    invoiceModalConfig({
      form,
      loading,
      response,
      setResponse,
      alertOpen,
      setAlertOpen,
      selectedRows,
      setSelectedRows,
    }),
  );

  const actions = invoiceActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["delete", "detail"],
  );

  const getModalSize = () => {
    switch (modalType) {
      case `detail`:
        return `sm`;
    }
  }

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
          <div>
            <DateRangePicker
              date={date}
              handleSelect={setDate}
              placeHolder="select date range"
            />
          </div>
        </div>
        <div>
          <StatsInvoice />
        </div>
      </div>
      <Separator />

      <div className="flex flex-col flex-1 pt-2">
        <InvoiceDataTable
          columns={InvoiceDataColumn({ actions, handleModalOpen })}
          handleModalOpen={handleModalOpen}
        />
        <CustomDialog open={openModal}
          onOpenChange={handleModalClose}
          title={modalConfig.title}
          description={modalConfig.description}
          modalType={modalType}
          headerAlignment="start"
          titleClassname="text-xl p-3"
          withHeaderBorder={modalType === 'delete'}
          size={getModalSize()}
        >
          {modalConfig.content}
        </CustomDialog>
      </div>
    </>
  );
}
