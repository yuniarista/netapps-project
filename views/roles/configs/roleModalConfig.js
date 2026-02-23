import { TriangleAlert } from "lucide-react";

import DeleteRoleForm from "../components/(form)/DeleteRolesForm";
import AddRoleForm from "../components/(form)/AddRolesForm";
import EditRoleForm from "../components/(form)/EditRolesForm";

export const roleModalConfig = ({
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
      title: "Create Role",
      content: (
        <AddRoleForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
          // handleModalClose={handleModalClose} // Kirim fungsi close ke form
        />
      ),
    },
    edit: {
      title: "Edit Role",
      content: (
        <EditRoleForm
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
        <DeleteRoleForm
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
