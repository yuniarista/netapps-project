"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import {
  invoiceModalConfig,
  roleModalConfig,
} from "../../configs/roleModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { useRoleHooks } from "../../hooks/useRoleHooks";
import roleActionConfig from "../../configs/roleActionConfig";
import RoleDataTable from "../(table)/RoleDataTable";
import RoleDataColumn from "../(table)/RoleColumn";

export default function RolePage() {
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
  } = useRoleHooks();

  const modalConfig = getModalConfig(
    modalType,
    roleModalConfig({
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

  const actions = roleActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete"],
  );

  return (
    <div>
      <RoleDataTable
        columns={RoleDataColumn({
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
        size="lg"
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
