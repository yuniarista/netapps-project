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
  handleDelete,
  handleModalClose,
}) => {
  return {
    addModal: {
      title: "Add Sub Category",
      content: (
        <AddSubCategoryForm
          loading={loading}
          handleModalClose={handleModalClose} // Kirim fungsi close ke form
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
      title: (
        <div className="flex items-center gap-3">
          <TriangleAlert className="w-5 h-5 text-destructive" />
          <span className="text-lg">Delete Confirmation</span>
        </div>
      ),
      content: (
        <DeleteSubCategoryForm
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
