import AddInHouseForm from "../components/(form)/AddInHouse";
import DeleteInHouseForm from "../components/(form)/DeleteInHouseForm";
import EditInHouseForm from "../components/(form)/EditInHouse";

export const inHouseModalConfig = ({
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
      title: "Create InHouse Sales",
      content: (
        <AddInHouseForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
          // handleModalClose={handleModalClose} // Kirim fungsi close ke form
        />
      )
    },
    edit: {
      title: "Edit InHouse Sales",
      content: (
        <EditInHouseForm
          form={form} 
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleUpdate={handleUpdate}
          // handleModalClose={handleModalClose} // Kirim fungsi close ke form
        />
      )
    },
    delete: {
          title: "Confirm Delete",
          content: (
            <DeleteInHouseForm
              loading={loading}
              response={response}
              setResponse={setResponse}
            />
          ),
        },
  };
};