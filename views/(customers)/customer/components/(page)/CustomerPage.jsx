"use client";


import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { useCustomerHooks } from "../../hooks/useCustomerHooks";
import CustomerDataColumn from "../(table)/CustomerDataColumn";
import { customerModalConfig } from "../../configs/customerModalConfig";
import CustomerDataTable from "../(table)/CustomerDataTable";
import customerActionConfig from "../../configs/customerActionConfig";

export default function CustomersPage() {
const {
    form,
    openModal,
    modalType,
    loading,
    response,
    setResponse,
    alertOpen,
    setAlertOpen,
    handleModalOpen,
    handleModalClose,
    handleCreate,
    handleUpdate,
    handleDelete
  } = useCustomerHooks();
  
  const actions = customerActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete", "detail", "notify"] 
  );

  const modalConfig = getModalConfig(
    modalType,
    customerModalConfig({
      form,
      loading,
      response,
      setResponse,
      alertOpen,
      setAlertOpen,
      handleCreate, 
      handleUpdate,
      handleDelete
    })
  );
  
  return (
    <div>
      <CustomerDataTable
        columns={CustomerDataColumn({
          actions,
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
