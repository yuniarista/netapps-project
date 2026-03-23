"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import PageHeader from "@/components/pageHeader";
import { PanelRight } from "lucide-react";
import { paymentModalConfig } from "../../configs/paymentModalConfig";
import paymentActionConfig from "../../configs/paymentActionConfig";
import PaymentInfo from "../(components)/PaymentInfo";
import TransactionSetting from "../(components)/TransactionSetting";
import { usePaymentGatewayHooks } from "../../hooks/usePaymentHooks";
import CustomDialog from "@/components/dialog/basicDialog";

export default function PaymentPage() {
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
  } = usePaymentGatewayHooks();

  const modalConfig = getModalConfig(
    modalType,
    paymentModalConfig({
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

  const actions = paymentActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete"],
  );

  return (
    <div>
      <PageHeader
        icon={<PanelRight className="w-4 h-4 text-gray-600" />}
        title="Payment Gateway"
      />

      <div className="p-4">
        <div className="space-y-4">
          <PaymentInfo onEdit={() => handleModalOpen("update")} />
          <TransactionSetting />
        </div>
      </div>
{/* 
      <TelegramDataTable
        columns={TelegramDataColumn({
          actions
        })}
        handleModalOpen={handleModalOpen}
      /> */}
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
