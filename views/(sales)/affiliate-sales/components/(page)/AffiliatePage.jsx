"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { useAffiliateHooks } from "../../hooks/useAffiliateHooks";
import { affiliateModalConfig } from "../../configs/affiliateModalConfig";
import affiliateActionConfig from "../../configs/affiliateActionConfig";
import AffiliateDataTable from "../(table)/AffiliateDataTable";
import AffiliateDataColumn from "../(table)/AffiliateDataColumn";

export default function AffiliatePage() {
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
  } = useAffiliateHooks();

  const modalConfig = getModalConfig(
    modalType,
    affiliateModalConfig({
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

  const actions = affiliateActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete"],
  );

  return (
    <div>
      <AffiliateDataTable
        columns={AffiliateDataColumn({
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
