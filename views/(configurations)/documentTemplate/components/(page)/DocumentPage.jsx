"use client";

import { Button } from "@/components/ui/button";
import { getModalConfig } from "@/utils/getModalConfig";
import { useDocumentHooks} from "../../hooks/useDocumentHooks";
import { documentModalConfig } from "../../configs/documentModalConfig";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomDialog from "@/components/dialog/basicDialog";
import documentActionConfig from "../../configs/documentActionConfig";
import DocumentDataColumn from "../(table)/DocumentDataColumn";
import DocumentDataTable from "../(table)/DocumentDataTable";

export default function DocumentPage() {
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
  } = useDocumentHooks();

  const modalConfig = getModalConfig(
    modalType,
    documentModalConfig({
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

  const actions = documentActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete"],
  );

  return (
    <div>
      <DocumentDataTable
        columns={DocumentDataColumn({
          actions,
          selectedRows,      
          setSelectedRows,
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
        size="lg"
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
