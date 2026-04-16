import { Edit, TriangleAlert } from "lucide-react";
import AddCustomerForm from "../components/(form)/AddCustomerForm";
import DeleteCustomerForm from "../components/(form)/DeleteCustomerForm";
import DetailCustomerForm from "../components/(form)/DetailCustomerForm";
import EditCustomerForm from "../components/(form)/EditCustomerform";
import UnassignedOrder from "../components/(components)/UnassignedOrder";
import AssignTechnician from "../components/(components)/AssignTechnician";

export const WorkOrderModalConfig = ({
  form,
  userProfile,
  areasData,
  productsData,
  homepassesData,
  loading,
  response,
  setResponse,
  alertOpen,
  setAlertOpen,
  formOptions,
  handleCreate,
  handleUpdate,
  handleDelete,
  setActiveModal,
  handleAssignTechnician,
  techniciansData
}) => {
  return {
    add: {
      title: "Create Customer",
      content: (
        <AddCustomerForm
          loading={loading}
          response={response}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          formOptions={formOptions}
          setResponse={setResponse}
          handleCreate={handleCreate}
          areasData={areasData}
          productsData={productsData}
          homepassesData={homepassesData}
        />
      )
    },
    detail: {
      title: "Detail Customer",
      content: (
        <DetailCustomerForm
          formData={form}
          formOptions={formOptions}
          loading={loading}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          response={response}
          setResponse={setResponse}
          handleUpdate={handleUpdate}
          productsData={productsData}
          homepassesData={homepassesData}
        />
      )
    },
    edit: {
      title: "Edit Customer",
      content: (
        <EditCustomerForm
          formData={form}
          formOptions={formOptions}
          loading={loading}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          response={response}
          setResponse={setResponse}
          handleUpdate={handleUpdate}
          areasData={areasData}
        />
      )
    },
    delete: {
      title: "Confirm Delete",
      content: (
        <DeleteCustomerForm
          formData={form}
          loading={loading}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          response={response}
          setResponse={setResponse}
          handleConfirm={handleDelete}
        />
      ),
    },
    unassign: {
      title: "Unassigned Work Orders",
      content: (
        <UnassignedOrder
          formData={form}
          loading={loading}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          response={response}
          setResponse={setResponse}
          onAssign={(order) => {
            // Logika pindah modal ke 'assign'
            setActiveModal("assign");
            // Opsional: simpan data order ke form atau state global jika diperlukan
          }}
        />
      ),
    },
    assign: {
      title: <div className="flex flex-col">
        <span>Assign Technician</span>
        <span className="text-xs font-normal text-muted-foreground mt-0.5">
          {form?.getValues?.("woNumber") || "WO/2026/03/00192"}
        </span>
      </div>,
      content: (
        <AssignTechnician
          formData={form}
          loading={loading}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          response={response}
          setResponse={setResponse}
          techniciansData={techniciansData}
          handleCreate={handleAssignTechnician}
        />
      ),
    },
  };
};