import { TriangleAlert } from "lucide-react";
import DeleteCategoryForm from "../components/(form)/DeleteCategoryForm";
import AddCategoryForm from "../components/(form)/AddCategoryForm";
import EditCategoryForm from "../components/(form)/EditCategoryForm";

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
      )
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
        <DeleteCategoryForm
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