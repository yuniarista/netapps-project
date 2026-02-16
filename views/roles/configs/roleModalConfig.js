import { TriangleAlert } from "lucide-react";

import DeleteRoleForm from "../components/(form)/DeleteRolesForm";
import AddRoleForm from "../components/(form)/AddRolesForm";

export const roleModalConfig = ({
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
      title: "Create Role",
      content: (
        <AddRoleForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
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
        <DeleteRoleForm
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