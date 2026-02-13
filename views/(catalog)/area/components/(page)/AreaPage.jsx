"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import { useAreaHooks} from "../../hooks/useAreaHooks";
import { areaModalConfig } from "../../configs/areaModalConfig";
import areaActionConfig from "../../configs/areaActionConfig";
import AreaDataTable from "../(table)/AreaDataTable";
import AreaDataColumn from "../(table)/AreaDataColumn";
import CustomDialog from "@/components/dialog/basicDialog";


export default function AreaPage() {
  const state = useAreaHooks([]);
  const { openModal, modalType, handleModalOpen, handleModalClose } = state;

  const modalConfig = getModalConfig(modalType, areaModalConfig(state));
  const actions = areaActionConfig((type, item) => {
    handleModalOpen(type, item);
  }, ["update", "delete"]);

  return (
    <div>
      <AreaDataTable
        columns={AreaDataColumn({
          actions
        })}
        handleModalOpen={handleModalOpen}
      />
      <CustomDialog
        open={openModal}
        onOpenChange={handleModalClose}
        title={modalConfig.title}
        headerAlignment="start"
        titleClassname="text-xl p-3"
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
