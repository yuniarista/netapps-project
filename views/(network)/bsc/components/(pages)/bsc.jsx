"use client";

import CustomButton from "@/components/button/customButton";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { useBscState } from "../../hooks/useBscHooks";
import { BscModalConfig } from "../../configs/BscModalConfig";
import BscDataColumn from "../(table)/BscDataColumn";
import BscDataTable from "../(table)/BscDataTable";
import bscActionConfig from "../../configs/BscActionConfig";

export default function BscPage() {
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
  } = useBscState();

  const modalConfig = getModalConfig(
    modalType,
    BscModalConfig({
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

  const actions = bscActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete", "detail", "notify"],
  );

  return (
    <div className="flex flex-col flex-1">
      <BscDataTable
        columns={BscDataColumn({
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
