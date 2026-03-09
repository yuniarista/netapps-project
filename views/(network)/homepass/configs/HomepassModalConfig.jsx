import AddHomepassForm from "../components/(form)/AddHomepassForm";
import DeleteForm from "../components/(form)/deleteForm";

export const HomepassModalConfig = ({
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
      title: "Create Homepass",
      content: (
        <AddHomepassForm
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
