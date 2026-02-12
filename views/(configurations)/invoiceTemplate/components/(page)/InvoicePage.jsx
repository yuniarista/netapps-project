"use client";

import { Button } from "@/components/ui-p/button";
import InvoiceDataColumn from "../(table)/InvoiceDataColumn";
import InvoiceDataTable from "../(table)/InvoiceDataTable";
import { UseInvoiceState } from "../../hooks/useInvoiceState";
import CustomDialog from "@/components/basicDialog";
import { getModalConfig } from "@/utils/getModalConfig";
import { Calendar, Calendar1Icon } from "lucide-react";
import invoiceActionConfig from "../../configs/invoiceActionConfig";
import { useInvoiceHooks } from "../../hooks/useInvoiceHooks";
import { invoiceModalConfig } from "../../configs/invoiceModalConfig";

export default function InvoicePage() {
  const state = useInvoiceHooks([]);
  const { openModal, modalType, handleModalOpen, handleModalClose } = state;

  const modalConfig = getModalConfig(modalType, invoiceModalConfig(state));
  const actions = invoiceActionConfig((type, item) => {
    handleModalOpen(type, item);
  }, ["update", "delete"]);

  return (
    <div>
      <InvoiceDataTable
        columns={InvoiceDataColumn({
          actions
        })}
        handleModalOpen={handleModalOpen}
      />
      <CustomDialog
        open={openModal}
        onOpenChange={handleModalClose}
        title={modalConfig.title}
        headerAlignment="start"
        titleClassname="text-xl p-3"
        withHeaderBorder={modalType === 'delete'}
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
