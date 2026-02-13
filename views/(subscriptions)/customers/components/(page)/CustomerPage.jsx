"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import { UseCustomerState } from "../../hooks/useCustomerHook";
import { CustomerModalConfig } from "../../configs/CustomerModalConfig";
import CustomerActionConfig from "../../configs/CustomerActionConfig";
import CustomerDataTable from "../(table)/CustomerDataTable";
import CustomerDataColumn from "../(table)/CustomerDataColumn";
import CustomDialog from "@/components/dialog/basicDialog";


export default function WhatsAppPage() {
  const state = UseCustomerState([]);
  const { openModal, modalType, handleModalOpen, handleModalClose } = state;

  const modalConfig = getModalConfig(modalType, CustomerModalConfig(state));
  const actions = CustomerActionConfig((type, item) => {
    handleModalOpen(type, item);
  }, ["update", "delete"]);

  return (
    <div>
      <CustomerDataTable
        columns={CustomerDataColumn ({
          actions
        })}
        handleModalOpen={handleModalOpen}
      />
      <CustomDialog
        open={openModal}
        onOpenChange={handleModalClose}
        title={modalConfig.title}
        modalType={modalType}
        headerAlignment="start"
        titleClassname="text-xl p-3"
        withHeaderBorder={modalType === 'delete'}
      >
        {modalConfig.content}
      </CustomDialog>
  </div>
  );
}
