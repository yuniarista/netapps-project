import AddCustomersForm from "../components/(form)/AddISPForm";
import DeleteISP from "../components/(form)/DeleteISPForm";
import EditISP from "../components/(form)/EditISPForm";

export const ISPModalConfig = (state) => {
  const {
    form,
    loading,
    response,
    setResponse,
    formOptions,
    alertOpen,
    setAlertOpen,
    handleCreate,
    handleUpdate,
    handleModalClose,
  } = state;

  return {
    add: {
      title: "Create Customer",
      content: (
        <AddCustomersForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
        />
      ),
    },
    edit: {
      title: "Edit ISP",
      content: (
        <EditISP
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
      title: "Confirm Delete",
      content: (
        <DeleteISP
          loading={loading}
          response={response}
          setResponse={setResponse}
        />
      ),
    },
  };
};
