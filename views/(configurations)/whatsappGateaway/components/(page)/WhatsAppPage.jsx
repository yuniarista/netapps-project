"use client";


import { getModalConfig } from "@/utils/getModalConfig";
import WhatsAppDataTable from "../(table)/WhatsAppDataTable";
import WhatsAppDataColumn from "../(table)/WhatsAppDataColumn";
import { whatsAppModalConfig } from "../../configs/WhatsAppModalConfig";
import { useWhatsAppHooks } from "../../hooks/useInvoiceHooks";
import whatsAppActionConfig from "../../configs/invoiceActionConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import WhatsAppBasicInfo from "../(components)/WhatsAppBasicInfo";
import PageHeader from "@/components/pageHeader";
import { PanelRight } from "lucide-react";
import WhatsAppConnection from "../(components)/WhatsAppConnection";
import WhatsAppFeatures from "../(components)/WhatsAppFeatures";

export default function WhatsAppPage() {
  const state = useWhatsAppHooks([]);
  const { openModal, modalType, handleModalOpen, handleModalClose } = state;

  const modalConfig = getModalConfig(modalType, whatsAppModalConfig(state));
  const actions = whatsAppActionConfig((type, item) => {
    handleModalOpen(type, item);
  }, ["update", "delete"]);

  return (
    <div>
      <PageHeader
        icon={<PanelRight className="w-4 h-4 text-gray-600" />}
        title="WhatsApp Gateway"
      />

      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <WhatsAppBasicInfo onEdit={() => handleModalOpen("update")} />
          <WhatsAppConnection />
          <WhatsAppFeatures />
        </div>
      </div>

      <WhatsAppDataTable
        columns={WhatsAppDataColumn({
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
