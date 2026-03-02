"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import {HomepassModalConfig} from "../../configs/HomepassModalConfig";
import { useHomepassState } from "../../hooks/useHomepassHooks";
import homepassActionConfig from "../../configs/HomepassActionConfig";
import HomepassDataTable from "../(table)/HomepassDataTable";
import HomepassDataColumn from "../(table)/HomepassDataColumn";

export default function HomepassPage() {
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
  } = useHomepassState();

  const modalConfig = getModalConfig(
    modalType,
    HomepassModalConfig({
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

  const actions = homepassActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete", "detail", "notify"],
  );

  return (
    <div className="flex flex-col flex-1">
      <HomepassDataTable
        columns={HomepassDataColumn({
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
