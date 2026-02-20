import { TriangleAlert } from "lucide-react";
import AddInvoiceForm from "../components/(form)/AddDocumentForm";
import DeleteInvoiceForm from "../components/(form)/DeleteDocumentForm";
import AddDocumentForm from "../components/(form)/AddDocumentForm";
import DeleteDocumentForm from "../components/(form)/DeleteDocumentForm";
import EditDocumentForm from "../components/(form)/EditDocumentForm";

export const documentModalConfig = ({
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
      title: "Create Document Template",
      content: (
        <AddDocumentForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
          // handleModalClose={handleModalClose} // Kirim fungsi close ke form
        />
      )
    },
    edit: {
      title: "Edit Document Template",
      content: (
        <EditDocumentForm
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
        <DeleteDocumentForm
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