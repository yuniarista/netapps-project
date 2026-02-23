import { TriangleAlert } from "lucide-react";
import AddAreaForm from "../components/(form)/AddAreaForm";
import DeleteAreaForm from "../components/(form)/DeleteAreaForm";
import EditAreaForm from "../components/(form)/EditAreaForm";

export const areaModalConfig = ({
  form,
  loading,
  response,
  setResponse,
  formOptions,
  alertOpen,
  setAlertOpen,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleModalClose,
}) => {
  return {
    addModal: {
      title: "Add Area",
      content: (
        <AddAreaForm
          loading={loading}
          handleModalClose={handleModalClose} // Kirim fungsi close ke form
          onSuccess={handleCreate}
        />
      ),
    },
    editModal: {
      title: "Edit Area",
      content: (
        <EditAreaForm
          formData={form}
          formOptions={formOptions}
          loading={loading}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          response={response}
          setResponse={setResponse}
          handleUpdate={handleUpdate}
          handleModalClose={handleModalClose}
        />
      ),
    },
    delete: {
      title: (
        <div className="flex items-center gap-3">
          <TriangleAlert className="w-5 h-5 text-destructive" />
          <span className="text-lg">Delete Confirmation</span>
        </div>
      ),
      content: (
        <DeleteAreaForm
          formData={form}
          loading={loading}
          response={response}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          setResponse={setResponse}
          handleConfirm={handleDelete}
        />
      ),
    },
  };
};
