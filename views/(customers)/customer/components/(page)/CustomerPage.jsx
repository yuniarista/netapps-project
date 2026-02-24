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
  } = useCustomerHooks();

  const modalConfig = getModalConfig(
    modalType,
    customerModalConfig({
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

  const actions = customerActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete", "detail", "notify"]
  );

  return (
    <div>
      <CustomerDataTable
        columns={CustomerDataColumn({
          actions,
          selectedRows,      
          setSelectedRows,
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
