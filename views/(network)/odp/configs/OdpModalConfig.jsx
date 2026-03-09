import AddOdpForm from "../components/(form)/AddOdpForm";
import DeleteForm from "../components/(form)/deleteForm";

export const OdpModalConfig = ({
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
      title: "Create Optical Distribution Point (ODP)",
      content: (
        <AddOdpForm
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
