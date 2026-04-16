"use client";


import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { usePotentialCustomerHooks } from "../../hooks/usePotentialCustomerHooks";
import { potentialModalConfig } from "../../configs/potentialModalConfig";
import CustomAlert from "@/components/alert/customAlert";
// import { getDashboardAccessPermissions } from "@/utils/getDashboardAccessPermissions";
import { usePotentialCustomersHandlers } from "../../services/usePotentialCustomersHandler";
import PotentialCustomerTable from "../(table)/PotentialCustomerTable";
import PotentialCustomerColumn from "../(table)/PotentiialCustomerColumn";
import potentialActionConfig from "../../configs/potentialActionConfig";

export default function PotentialCustomersPage({
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
  } = usePotentialCustomerHooks(configurationsData);

  // const dashboardAccessPermissions = getDashboardAccessPermissions();

  const { handleCreate, handleUpdate, handleDelete, handleBulkDelete } =
    usePotentialCustomersHandlers({
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

  // const actionsColumnConfig = potentialActionConfig(
  //   handleModalOpen,
  //   dashboardAccessPermissions
  // );

  const actions = potentialActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete", "detail", "notify"]
  );

  const modalConfig = getModalConfig(
    modalType,
    potentialModalConfig({
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
      <PotentialCustomerTable
        uri={uri}
        data={data}
        setData={setData}
        columns={PotentialCustomerColumn({
          actions,
          selectedRows,
          setSelectedRows,
          handleModalOpen
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
        headerAlignment="start"
        titleClassname="text-xl p-3"
        withHeaderBorder={modalType === 'delete'}
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
