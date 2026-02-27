import { TriangleAlert } from "lucide-react";
import AddRoleForm from "../components/(form)/AddRolesForm";
import EditRoleForm from "../components/(form)/EditRolesForm";
import DeleteRolesForm from "../components/(form)/DeleteRolesForm";

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
      title: "Confirm Delete",
      content: (
        <DeleteRolesForm
          loading={loading}
          response={response}
          setResponse={setResponse}
        />
      ),
    },
  };
};
