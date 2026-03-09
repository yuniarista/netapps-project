"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import { UseISPState } from "../../hooks/useISPHook";
import { ISPModalConfig } from "../../configs/ISPModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import ISPActionConfig from "../../configs/ISPActionConfig";
import ISPDataTable from "../(table)/ISPDataTable";
import ISPDataColumn from "../(table)/ISPDataColumn";


export default function ISPPage() {
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
  } = UseISPState();

  const modalConfig = getModalConfig(
    modalType,
    ISPModalConfig({
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

  const actions = ISPActionConfig((type, item) => {
    handleModalOpen(type, item);
  }, ["update", "delete"]);

  return (
    <div>
      <ISPDataTable
        columns={ISPDataColumn ({
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
