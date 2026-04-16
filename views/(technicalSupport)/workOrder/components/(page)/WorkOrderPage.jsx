"use client";


import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import {useRequestedCustomerHooks } from "../../hooks/useRequestedCustomerHooks";
import CustomAlert from "@/components/alert/customAlert";
// import { getDashboardAccessPermissions } from "@/utils/getDashboardAccessPermissions";
import { useRequestedCustomersHandlers } from "../../services/useRequestedCustomersHandler";
import TechnicalSupportTable from "../(table)/WorkOrderTable";
import TechnicalSupportColumn from "../(table)/WorkOrderColumn";
import WorkOrderActionConfig from "../../configs/workOrderActionConfig";
import { WorkOrderModalConfig } from "../../configs/workOrderModalConfig";
import WorkOrderColumn from "../(table)/WorkOrderColumn";
import WorkOrderTable from "../(table)/WorkOrderTable";

export default function WorkOrderPage({
  uri,
  configurationsData,
  customersData,
  areasData,
  productsData,
  homepassesData,
}) {
  const {
    form,
    data,
    setData,
    loading,
    response,
    modalType,
    openModal,
    setLoading,
    setResponse,
    setOpenModal,
    alertOpen,
    setAlertOpen,
    paginationModel,
    handleModalOpen,
    handleModalClose,
    setPaginationModel,
    selectedRows,
    setSelectedRows,
    filterParams,
    setFilterParams
  } = useRequestedCustomerHooks(configurationsData);

  // const dashboardAccessPermissions = getDashboardAccessPermissions();

  const { handleCreate, handleUpdate, handleDelete, handleBulkDelete } =
    useRequestedCustomersHandlers({
      uri,
      setData,
      setLoading,
      setResponse,
      setPaginationModel,
      setModal: setOpenModal,
      form,
      setSelectedRows,
      filterParams
    });

  // const actionsColumnConfig = reqCustomerActionConfig(
  //   handleModalOpen,
  //   dashboardAccessPermissions
  // );

    const actions = WorkOrderActionConfig(
      (type, item) => {
        handleModalOpen(type, item);
      },
      ["update", "delete"],
    );

  const modalConfig = getModalConfig(
    modalType,
    WorkOrderModalConfig({
      form,
      loading,
      response,
      setResponse,
      alertOpen,
      setAlertOpen,
      selectedRows,
      setSelectedRows,
      handleCreate,
      handleUpdate,
      handleDelete,
      handleBulkDelete,
      areasData,
      productsData,
      homepassesData,
      setActiveModal: (type, item) => handleModalOpen(type, item),
    }),
  );

  return (
    <div>
      <CustomAlert
        variant={response?.status ?? "info"}
        title={response?.status}
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
      >
        {response?.message}
      </CustomAlert>
      <WorkOrderTable
        uri={uri}
        data={data}
        setData={setData}
        columns={WorkOrderColumn({
          // actions: actionsColumnConfig,
          actions,
          selectedRows,
          setSelectedRows,
        })}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        setLoading={setLoading}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        handleModalOpen={handleModalOpen}
        // dashboardAccessPermissions={dashboardAccessPermissions}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      <CustomDialog
        open={openModal}
        onOpenChange={handleModalClose}
        title={modalConfig.title}
        modalType={modalType}
        size="600"
        headerAlignment="start"
        titleClassname="text-xl p-3"
        withHeaderBorder={modalType === 'delete'}
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
