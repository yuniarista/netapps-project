import { Edit, TriangleAlert } from "lucide-react";
import AddCustomerForm from "../components/(form)/AddCustomerForm";
import DeleteCustomerForm from "../components/(form)/DeleteCustomerForm";
import DetailCustomerForm from "../components/(form)/DetailCustomerForm";
import EditCustomerForm from "../components/(form)/EditCustomerform";

export const customerModalConfig = ({
  form,
  loading,
  response,
  setResponse,
  alertOpen,
  setAlertOpen,
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
          setResponse={setResponse}
          handleCreate={handleCreate}
          // handleModalClose={handleModalClose} 
        />
      )
    },
    detail: {
      title: "Detail Customer",
      content: (
        <DetailCustomerForm
          form={form}
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleUpdate={handleUpdate}
        />
      )
    },
    edit: {
      title: "Edit Customer",
      content: (
        <EditCustomerForm
          form={form} 
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleUpdate={handleUpdate}
          // handleModalClose={handleModalClose}
        />
      )
    },
    delete: {
      title: "Confirm Delete",
      content: (
        <DeleteCustomerForm
          formData={form}
          loading={loading}
          response={response}
          setResponse={setResponse}
        />
      ),
    },
  };
};