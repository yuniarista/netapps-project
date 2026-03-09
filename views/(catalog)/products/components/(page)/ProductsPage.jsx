"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import { useProductHooks } from "../../hooks/useProductHooks";
import { productsModalConfig } from "../../configs/productsModalConfig";
import productActionConfig from "../../configs/productsActionConfig";
import ProductDataTable from "../(table)/ProductsDataTable";
import ProductDataColumn from "../(table)/ProductsDataColumn";
import CustomDialog from "@/components/dialog/basicDialog";

export default function ProductPage() {
  
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
  } = useProductHooks();

  const modalConfig = getModalConfig(
    modalType,
    productsModalConfig({
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
  
  const actions = productActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete"],
  );

  return (
    <div className="flex flex-col flex-1">
      <ProductDataTable
        columns={ProductDataColumn({
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
        withHeaderBorder={modalType === "delete"}
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
