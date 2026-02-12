"use client";

import CustomDialog from "@/components/basicDialog";
import { getModalConfig } from "@/utils/getModalConfig";
import WhatsAppDataTable from "../(table)/WhatsAppDataTable";
import WhatsAppDataColumn from "../(table)/WhatsAppDataColumn";
import { whatsAppModalConfig } from "../../configs/WhatsAppModalConfig";
import { useWhatsAppHooks } from "../../hooks/useInvoiceHooks";
import whatsAppActionConfig from "../../configs/invoiceActionConfig";


export default function WhatsAppPage() {
  const state = useWhatsAppHooks([]);
  const { openModal, modalType, handleModalOpen, handleModalClose } = state;

  const modalConfig = getModalConfig(modalType, whatsAppModalConfig(state));
  const actions = whatsAppActionConfig((type, item) => {
    handleModalOpen(type, item);
  }, ["update", "delete"]);

  return (
    <div>
      <WhatsAppDataTable
        columns={WhatsAppDataColumn({
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
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
