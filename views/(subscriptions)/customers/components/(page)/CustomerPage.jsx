"use client";

import CustomDialog from "@/components/basicDialog";
import CustomersForm from "../(form)/AddCustomersForm";
import { getModalConfig } from "@/utils/getModalConfig";
import { CustomerModalConfig } from "../../configs/CustomerModalConfig";
import { UseCustomerState } from "../../hooks/useCustomerHook";
import CustomerDataTable from "../(table)/CustomerDataTable";
import CustomerDataColumn from "../(table)/CustomerDataColumn";

export default function CustomersPage() {
const state = UseCustomerState([]);
  const {
    openModal,
    modalType,
    handleModalOpen,
    handleModalClose,
  } = state;

  const modalConfig = getModalConfig(
    modalType,
    CustomerModalConfig(state)
  );
  return (
    <div className="space-y-4">
        <CustomerDataTable columns={CustomerDataColumn} handleModalOpen={handleModalOpen}/>
      <CustomDialog className="overflow-scroll"
      open={openModal}
        onOpenChange={handleModalClose}
        title={modalConfig.title}
        headerAlignment="start"
        titleClassname="text-xl p-3">
            {modalConfig.content}
        
      </CustomDialog>
    </div>
  );
}
