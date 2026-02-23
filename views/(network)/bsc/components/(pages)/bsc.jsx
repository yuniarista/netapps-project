"use client";

import CustomButton from "@/components/button/customButton";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { useBscState } from "../../hooks/useBscHooks";
import { BscModalConfig } from "../../configs/BscModalConfig";

export default function BscPage() {
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
  } = useBscState();

  const modalConfig = getModalConfig(
    modalType,
    BscModalConfig({
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

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4 text-center">
        <Label className="text-lg">No BSC Records Found</Label>
        <p className="text-sm text-muted-foreground">
          Connect your POP to distribution
          <br /> cabinets. Add a BSC to manage your
          <br /> fiber optic backbone splices.
        </p>
        <CustomButton
          variant="primary"
          className="flex gap-2"
          onClick={() => handleModalOpen("add")}
        >
          <Plus className="w-4 h-4" /> Create BSC
        </CustomButton>
      </div>
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
    </>
  );
}
