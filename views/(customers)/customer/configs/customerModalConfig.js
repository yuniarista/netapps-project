import { TriangleAlert } from "lucide-react";
import AddCustomerForm from "../components/(form)/AddCustomerForm";
import DeleteCustomerForm from "../components/(form)/DeleteCustomerForm";
import DetailCustomerForm from "../components/(form)/DetailCustomerForm";

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
          // handleModalClose={handleModalClose} // Kirim fungsi close ke form
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
          // handleModalClose={handleModalClose} // Kirim fungsi close ke form
        />
      )
    },
    delete: {
      title: (
        <div className="flex items-center gap-3">
          <TriangleAlert className="w-5 h-5 text-destructive" /> 
          <span className="text-lg">Delete Confirmation</span>
        </div>
      ),
      content: (
        <DeleteCustomerForm
          formData={form}
          loading={loading}
          response={response}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          setResponse={setResponse}
          handleConfirm={handleDelete}
        />
      )
    }
  };
};