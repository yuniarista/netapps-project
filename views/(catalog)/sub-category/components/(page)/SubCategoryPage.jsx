"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import { useSubCategoryHooks} from "../../hooks/useSubCategoryHooks";
import { subCategoryModalConfig } from "../../configs/subCategoryModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import subCategoryActionConfig from "../../configs/subCategoryActionConfig";
import SubCategoryDataTable from "../(table)/SubCategoryDataTable";
import SubCategoryDataColumn from "../(table)/SubCategoryDataColumn";


export default function SubCategoryPage() {
  const state = useSubCategoryHooks([]);
  const { openModal, modalType, handleModalOpen, handleModalClose } = state;

  const modalConfig = getModalConfig(modalType, subCategoryModalConfig(state));
  const actions = subCategoryActionConfig((type, item) => {
    handleModalOpen(type, item);
  }, ["update", "delete"]);

  return (
    <div>
      <SubCategoryDataTable
        columns={SubCategoryDataColumn({
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
