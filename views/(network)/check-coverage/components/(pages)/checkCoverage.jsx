"use client";

import CustomButton from "@/components/button/customButton";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useCheckCoverageState } from "../../hooks/useCheckCoverageHooks";
import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { CheckCoverageModalConfig } from "../../configs/CheckCoverageModalConfig";

export default function CoveragePage() {
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
  } = useCheckCoverageState();

  const modalConfig = getModalConfig(
    modalType,
    CheckCoverageModalConfig({
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
        <Label className="text-lg">Network Setup Required</Label>
        <p className="text-sm text-muted-foreground">
          Network not configured yet. Create
          <br /> POP to start coverage checking
        </p>
        <CustomButton
          variant="primary"
          className="flex gap-2"
          onClick={() => handleModalOpen("add")}
        >
          <Plus className="w-4 h-4" /> Setup Network
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
