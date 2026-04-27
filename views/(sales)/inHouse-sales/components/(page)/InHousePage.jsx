"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { useInHouseHooks } from "../../hooks/useInHouseHooks";
import { inHouseModalConfig } from "../../configs/inHouseModalConfig";
import inHouseActionConfig from "../../configs/inHouseActionConfig";
import InHouseDataTable from "../(table)/InHouseDataTable";
import InHouseDataColumn from "../(table)/InHouseDataColumn";

export default function InHousePage() {
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
  } = useInHouseHooks();

  const modalConfig = getModalConfig(
    modalType,
    inHouseModalConfig({
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

  const actions = inHouseActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete"],
  );

  return (
    <div>
      <InHouseDataTable
        columns={InHouseDataColumn({
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
        size="lg"
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
