"use client";

import { usePopState } from "../../hooks/usePopHooks";
import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { PopModalConfig } from "../../configs/PopModalConfig";
import PopDataTable from "../(table)/PopDataTable";
import PopDataColumn from "../(table)/PopDataColumn";
import popActionConfig from "../../configs/PopActionConfig";

export default function PopPage() {
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
  } = usePopState();

  const areaData = [
    { label: "Denpasar", value: "denpasar" },
    { label: "Tabanan", value: "tabanan" },
    { label: "Jembrana", value: "jembrana" },
  ];

  const formOptions = {
    area: areaData,
  };

  const modalConfig = getModalConfig(
    modalType,
    PopModalConfig({
      form,
      formOptions,
      loading,
      response,
      setResponse,
      alertOpen,
      setAlertOpen,
      selectedRows,
      setSelectedRows,
    }),
  );

  const actions = popActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete", "detail", "notify"],
  );

  return (
    <div className="flex flex-col flex-1">
      <PopDataTable
        columns={PopDataColumn({
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
