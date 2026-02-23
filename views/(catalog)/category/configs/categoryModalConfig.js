import { TriangleAlert } from "lucide-react";

import AddCategoryForm from "../components/(form)/AddCategoryForm";
import EditCategoryForm from "../components/(form)/EditCategoryForm";
import DeleteCategoryForm from "../components/(form)/DeleteCategoryForm";

export const categoryModalConfig = ({
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
      title: "Add Category",
      content: (
        <AddCategoryForm
          loading={loading}
          handleModalClose={handleModalClose} // Kirim fungsi close ke form
          onSuccess={handleCreate}
        />
      ),
    },
    editModal: {
      title: "Edit Category",
      content: (
        <EditCategoryForm
          formData={form}
          formOptions={formOptions}
          loading={loading}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          response={response}
          setResponse={setResponse}
          handleUpdate={handleUpdate}
        />
      ),
    },
    delete: {
      title: "Confirm Delete",
      content: (
        <DeleteCategoryForm
          loading={loading}
          response={response}
          setResponse={setResponse}
        />
      ),
    },
  };
};
