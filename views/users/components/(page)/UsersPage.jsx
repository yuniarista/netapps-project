"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { useUsersHooks } from "../../hook/useUsersHooks";
import usersActionConfig from "../../configs/usersActionConfig";
import UsersDataTable from "../(table)/UsersDataTable";
import UsersDataColumn from "../(table)/UsersDataColumn";
import { usersModalConfig } from "../../configs/usersModalConfig";

export default function UsersPage() {
  const state = useUsersHooks([]);
  const { openModal, modalType, handleModalOpen, handleModalClose } = state;

  const modalConfig = getModalConfig(modalType, usersModalConfig(state));
  const actions = usersActionConfig((type, item) => {
    handleModalOpen(type, item);
  }, ["update", "delete"]);

  return (
    <div>
      <UsersDataTable
        columns={UsersDataColumn({
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
