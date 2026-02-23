import { TriangleAlert } from "lucide-react";
import AddUsersForm from "../components/(form)/AddUsersForm";
import EditUsersForm from "../components/(form)/EditUserForm";
import DeleteUserForm from "../components/(form)/DeleteUserForm";

export const usersModalConfig = ({
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
      ),
    },
    edit: {
      title: "Edit Users",
      content: (
        <EditUsersForm
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
        <DeleteUserForm
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
