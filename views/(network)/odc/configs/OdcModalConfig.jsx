import AddOdcForm from "../components/(form)/AddOdcForm";
import DeleteForm from "../components/(form)/deleteForm";

export const OdcModalConfig = ({
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
      title: "Create Optical Distribution Cabinet (ODC)",
      content: (
        <AddOdcForm
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
