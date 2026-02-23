"use client";


import { getModalConfig } from "@/utils/getModalConfig";
import { telegramModalConfig } from "../../configs/TelegramModalConfig";
import { useTelegramHooks} from "../../hooks/useTelegramHooks";
import CustomDialog from "@/components/dialog/basicDialog";
import PageHeader from "@/components/pageHeader";
import { PanelRight } from "lucide-react";
import TelegramBasicInfo from "../(components)/TelegramBasicInfo";
import TelegramConnection from "../(components)/TelegramConnection";
import TelegramFeatures from "../(components)/TelegramFeatures";
import telegramActionConfig from "../../configs/TelegramActionConfig";
import TelegramDataTable from "../(table)/TelegramDataTable";
import TelegramDataColumn from "../(table)/TelegramDataColumn";

export default function TelegramPage() {
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
  } = useTelegramHooks();

  const modalConfig = getModalConfig(
    modalType,
    telegramModalConfig({
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

  const actions = telegramActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete"],
  );

  return (
    <div>
      <PageHeader
        icon={<PanelRight className="w-4 h-4 text-gray-600" />}
        title="Telegram Gateway"
      />

      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <TelegramBasicInfo onEdit={() => handleModalOpen("update")} />
          <TelegramConnection />
          <TelegramFeatures />
        </div>
      </div>

      <TelegramDataTable
        columns={TelegramDataColumn({
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
        size="600"
        withHeaderBorder={modalType === 'delete'}
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
