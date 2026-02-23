"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import { useAreaHooks } from "../../hooks/useAreaHooks";
import { areaModalConfig } from "../../configs/areaModalConfig";
import areaActionConfig from "../../configs/areaActionConfig";
import AreaDataTable from "../(table)/AreaDataTable";
import AreaDataColumn from "../(table)/AreaDataColumn";
import CustomDialog from "@/components/dialog/basicDialog";

export default function AreaPage() {
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
    handleDelete,
  } = useAreaHooks();

  const modalConfig = getModalConfig(
    modalType,
    areaModalConfig({
      form,
      loading,
      response,
      setResponse,
      alertOpen,
      setAlertOpen,
      handleCreate,
      handleUpdate,
      handleDelete,
    }),
  );

  const actions = areaActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete"],
  );

  return (
    <div>
      <AreaDataTable
        columns={AreaDataColumn({
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
