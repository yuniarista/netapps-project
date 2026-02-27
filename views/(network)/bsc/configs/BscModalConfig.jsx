import AddBscForm from "../components/(form)/AddBscForm";
import AddUsersForm from "../components/(form)/AddBscForm";
import DeleteForm from "../components/(form)/deleteForm";

export const BscModalConfig = ({
  form,
  loading,
  response,
  setResponse,
  alertOpen,
  setAlertOpen,
  handleCreate,
  handleUpdate,
  handleDelete,
}) => {
  return {
    add: {
      title: "Create Base Station Controller (BSC)/OLT",
      content: (
        <AddBscForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
        />
      ),
    },
    delete: {
      title: "Confirm Delete",
      content: (
        <DeleteForm
          loading={loading}
          response={response}
          setResponse={setResponse}
        />
      ),
    },
  };
};
