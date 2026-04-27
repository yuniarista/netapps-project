"use client";

import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { useFaqState } from "../../hooks/usFaqHooks";
import { FaqModalConfig } from "../../configs/FaqModalConfig";
import FaqActionConfig from "../../configs/FaqActionConfig";
import FaqDataColumn from "../(table)/FaqDataColumn";
import FaqDataTable from "../(table)/FaqDataTable";
import PageHeader from "@/components/pageHeader";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function FaqPage({ uri, faqData }) {
  const {
    form,
    setForm,
    openModal,
    setOpenModal,
    modalType,
    setModalType,
    data,
    setData,
    search,
    setSearch,
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
  } = useFaqState(faqData);

  const areaData = [
    { label: "Denpasar", value: "denpasar" },
    { label: "Tabanan", value: "tabanan" },
    { label: "Jembrana", value: "jembrana" },
  ];

  const formOptions = {
    area: areaData,
  };

  const modalConfig = getModalConfig(
    modalType,
    FaqModalConfig({
      form,
      formOptions,
      loading,
      response,
      setResponse,
      alertOpen,
      setAlertOpen,
      selectedRows,
      setSelectedRows,
    }),
  );

  const actions = FaqActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete", "detail", "notify"],
  );

  return (
    <div className="flex flex-col h-screen">
      <PageHeader title={"NetApps"}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground">
                Faq List
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </PageHeader>
      <FaqDataTable
        uri={uri}
        data={data}
        setData={setData}
        columns={FaqDataColumn({
          actions,
        })}
        handleModalOpen={handleModalOpen}
        search={search}
        setSearch={setSearch}
        // handleFilter={handleFilter}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        setLoading={setLoading}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
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
    </div>
  );
}
