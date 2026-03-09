"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import { useCategoryHooks} from "../../hooks/useCategoryHooks";
import { categoryModalConfig } from "../../configs/categoryModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import categoryActionConfig from "../../configs/categoryActionConfig";
import CategoryDataTable from "../(table)/CategoryDataTable";
import CategoryDataColumn from "../(table)/CategoryDataColumn";


export default function CategoryPage() {
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
    } = useCategoryHooks();
  
    const modalConfig = getModalConfig(
      modalType,
      categoryModalConfig({
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

  const actions = categoryActionConfig((type, item) => {
    handleModalOpen(type, item);
  }, ["update", "delete"]);

  return (
    <div className="flex flex-col flex-1">
      <CategoryDataTable
        columns={CategoryDataColumn({
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
