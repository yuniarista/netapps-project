import AddGoogleAPIForm from "../components/(form)/AddGoogleAPI";
import EditAPICredentialForm from "../components/(form)/EditAPICredential";
import EditGoogleAPIForm from "../components/(form)/EditGoogleAPI";

export const googleAPIModalConfig = (state) => {
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
      title: "Create Google API Data",
      content: (
        <AddGoogleAPIForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
          handleModalClose={handleModalClose} // Kirim fungsi close ke form
        />
      ),
    },
    update: {
      title: "Edit Google API Data",
      content: (
        <EditGoogleAPIForm
          formData={form}
          formOptions={formOptions}
          loading={loading}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          response={response}
          setResponse={setResponse}
          handleUpdate={handleUpdate} // Jika ada fungsi update
        />
      ),
    },
    edit: {
      title: "Edit Key API",
      content: (
        <EditAPICredentialForm
          formData={form}
          formOptions={formOptions}
          loading={loading}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          response={response}
          setResponse={setResponse}
          handleUpdate={handleUpdate} // Jika ada fungsi update
        />
      ),
    },
  };
};
