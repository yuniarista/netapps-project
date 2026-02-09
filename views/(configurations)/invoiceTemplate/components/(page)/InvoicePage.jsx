"use client";

import { Button } from "@/components/ui-p/button";
import InvoiceDataColumn from "../(table)/InvoiceDataColumn";
import InvoiceDataTable from "../(table)/InvoiceDataTable";
import { UseInvoiceState } from "../../hooks/useInvoiceState";
import CustomDialog from "@/components/basicDialog";
import { getModalConfig } from "@/utils/getModalConfig";
import { InvoiceModalConfig } from "../../configs/InvoiceModalConfig";
import { Calendar, Calendar1Icon } from "lucide-react";

export default function InvoicePage() {
  const state = UseInvoiceState([]);
  const { openModal, modalType, handleModalOpen, handleModalClose } = state;

  const modalConfig = getModalConfig(modalType, InvoiceModalConfig(state));

  return (
    <div className="space-y-4">
      <InvoiceDataTable
        columns={InvoiceDataColumn}
        handleModalOpen={handleModalOpen}
      />
      <CustomDialog
        open={openModal}
        onOpenChange={handleModalClose}
        title={modalConfig.title}
        headerAlignment="start"
        titleClassname="text-xl p-3"
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
