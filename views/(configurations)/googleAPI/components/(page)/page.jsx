"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import { useGoogleAPIHooks } from "../../hooks/useGoogleAPIHooks";
import CustomDialog from "@/components/dialog/basicDialog";
import PageHeader from "@/components/pageHeader";
import { PanelRight } from "lucide-react";
import googleAPIActionConfig from "@/views/(configurations)/whatsappGateaway/configs/WhatsAppActionConfig";
import GoogleAPIInfo from "../(components)/GoogleAPIInfo";
import APICredential from "../(components)/APICredential";
import { googleAPIModalConfig } from "../../configs/googleAPIModalConfig";
import GoogleApi from "../(components)/DataGoogleApi";

export default function GoogleAPIPage() {
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
  } = useGoogleAPIHooks();

  const modalConfig = getModalConfig(
    modalType,
    googleAPIModalConfig({
      form,
      loading,
      response,
      setResponse,
      alertOpen,
      selectedData: form,
      setAlertOpen,
      selectedRows,
      setSelectedRows,
    }),
  );

  // const actions = googleAPIActionConfig(
  //   (type, item) => {
  //     handleModalOpen(type, item);
  //   },
  //   ["update", "delete"],
  // );

  return (
    <div className="flex flex-col flex-1">
      <PageHeader
        icon={<PanelRight className="w-4 h-4 text-gray-600" />}
        title="Google API"
      />

      <div className="p-4">
        {/* <div className="grid grid-cols-2 gap-4">
          <GoogleAPIInfo onEdit={() => handleModalOpen("update")} />
          <APICredential />
        </div> */}
        <GoogleApi handleModalOpen={handleModalOpen}/>
      </div>

      <CustomDialog
        open={openModal}
        onOpenChange={handleModalClose}
        title={modalConfig.title}
        modalType={modalType}
        headerAlignment="start"
        titleClassname="text-xl p-3"
        size="md"
        withHeaderBorder={modalType === 'delete'}
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
