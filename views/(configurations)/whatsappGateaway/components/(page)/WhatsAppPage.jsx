"use client";
import { getModalConfig } from "@/utils/getModalConfig";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { UseWhatsAppState } from "../../hooks/useWhatsAppState";
import { WhatsAppModalConfig } from "../../configs/WhatsAppModalConfig";
import WhatsAppDataTable from "../(table)/WhatsAppDataTable";
import WhatsAppDataColumn from "../(table)/WhatsAppDataColumn";

export default function WhatsAppPage() {
  const state = UseWhatsAppState([]);
  const { openModal, modalType, handleModalOpen, handleModalClose } = state;

  const modalConfig = getModalConfig(modalType, WhatsAppModalConfig(state));
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <div className="text-sm font-medium text-center">Menu Sidebar</div>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <div>
          <WhatsAppDataTable
            columns={WhatsAppDataColumn}
            handleModalOpen={handleModalOpen}
          />
          <Sheet open={openModal} onOpenChange={handleModalClose} modal={false}>
            <SheetContent side="left" className="sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-xl px-3">
                  {modalConfig.title}
                </SheetTitle>
                <div>
                  {modalConfig.content}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          {/* <CustomDialog
            className="overflow-scroll"
            open={openModal}
            onOpenChange={handleModalClose}
            title={modalConfig.title}
            headerAlignment="start"
            titleClassname="text-xl p-3"
          >
            {modalConfig.content}
          </CustomDialog> */}
        </div>
      </SidebarInset>
    </>
  );
}
