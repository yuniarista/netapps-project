import { TriangleAlert } from "lucide-react";
import AddUsersForm from "../components/(form)/AddUsersForm";
import DeleteDocumentForm from "@/views/(configurations)/documentTemplate/components/(form)/DeleteDocumentForm";

export const usersModalConfig = ({
  form,
  loading,
  response,
  setResponse,
  alertOpen,
  setAlertOpen,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleModalClose
}) => {
  return {
    add: {
      title: "Create User",
      content: (
        <AddUsersForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
          handleModalClose={handleModalClose}
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