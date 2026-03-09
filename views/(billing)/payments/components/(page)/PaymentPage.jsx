"use client";
import { useState } from "react";
import CustomDialog from "@/components/dialog/basicDialog";
import { getModalConfig } from "@/utils/getModalConfig";
import { usePaymentHooks } from "../../hooks/usePaymentHooks";
import { paymentModalConfig } from "../../configs/paymentModalConfig";
import PaymentCard from "../(card)/paymentCard";
import { Separator } from "@/components/ui/separator";

export default function paymentPage() {
  // const [date, setDate] = useState({ from: undefined, to: undefined });
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
  } = usePaymentHooks();

  const modalConfig = getModalConfig(
      modalType,
      paymentModalConfig({
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

  // const actions = invoiceActionConfig(
  //   (type, item) => {
  //     handleModalOpen(type, item);
  //   },
  //   ["delete", "detail"],
  // );

  const getModalSize =() => {
    switch(modalType) {
      case `adds`:
        return `md`;
    }
  }

  return (
    <>
    
      <div className="flex flex-col flex-1">
        {/* <InvoiceDataTable
          columns={InvoiceDataColumn({ actions,handleModalOpen })}
          handleModalOpen={handleModalOpen}
        /> */}
        <PaymentCard 
        handleModalOpen={handleModalOpen}/>
        <CustomDialog open={openModal}
          onOpenChange={handleModalClose}
          title={modalConfig.title}
          description={modalConfig.description}
          modalType={modalType}
          headerAlignment="start"
          titleClassname="text-xl p-3" 
          withHeaderBorder={modalType === 'delete'}
          size={getModalSize()}
          >
            {modalConfig.content}
        </CustomDialog>
      </div>
    </>
  );
}
