import { TriangleAlert } from "lucide-react";
import AddSubCategoryForm from "../components/(form)/AddSubCategoryForm";
import DeleteSubCategoryForm from "../components/(form)/DeleteSubCategoryForm";
import EditSubCategoryForm from "../components/(form)/EditSubCategoryForm";

export const subCategoryModalConfig = ({
  form,
  loading,
  response,
  setResponse,
  formOptions,
  alertOpen,
  setAlertOpen,
  handleCreate,
  handleUpdate,
  handleModalClose,
}) => {
  return {
    addModal: {
      title: "Add Sub Category",
      content: (
        <AddSubCategoryForm
          loading={loading}
          handleModalClose={handleModalClose}
          onSuccess={handleCreate}
        />
      ),
    },
    editModal: {
      title: "Edit Sub Category",
      content: (
        <EditSubCategoryForm
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
        <DeleteSubCategoryForm
          loading={loading}
          response={response}
          setResponse={setResponse}
        />
      ),
    },
  };
};
