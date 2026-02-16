"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import { invoiceModalConfig, roleModalConfig } from "../../configs/roleModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { useRoleHooks } from "../../hooks/useRoleHooks";
import roleActionConfig from "../../configs/roleActionConfig";
import RoleDataTable from "../(table)/RoleDataTable";
import RoleDataColumn from "../(table)/RoleColumn";

export default function RolePage() {
  const state = useRoleHooks([]);
  const { openModal, modalType, handleModalOpen, handleModalClose } = state;

  const modalConfig = getModalConfig(modalType, roleModalConfig(state));
  const actions = roleActionConfig((type, item) => {
    handleModalOpen(type, item);
  }, ["update", "delete"]);

  return (
    <div>
      <RoleDataTable
        columns={RoleDataColumn({
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
