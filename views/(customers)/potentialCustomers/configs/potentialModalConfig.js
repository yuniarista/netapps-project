import { Edit, TriangleAlert } from "lucide-react";
import AddCustomerForm from "../components/(form)/AddCustomerForm";
import DeleteCustomerForm from "../components/(form)/DeleteCustomerForm";
import DetailCustomerForm from "../components/(form)/DetailCustomerForm";
import EditCustomerForm from "../components/(form)/EditCustomerform";

export const potentialModalConfig = ({
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
  handleDelete
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
  };
};