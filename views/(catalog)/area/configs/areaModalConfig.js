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
      title: "Confirm Delete",
      content: (
        <DeleteAreaForm
          loading={loading}
          response={response}
          setResponse={setResponse}
        />
      ),
    },
  };
};
