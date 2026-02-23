import AddUsersForm from "../components/(form)/AddPopForm";

export const PopModalConfig = ({
  form,
  formOptions,
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
      title: "Create Point of Presence (POP)",
      content: (
        <AddUsersForm
          formOptions={formOptions}
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
        />
      ),
    },
    // delete: {
    //   title: (
    //     <div className="flex items-center gap-3">
    //       <TriangleAlert className="w-5 h-5 text-destructive" />
    //       <span className="text-lg">Delete Confirmation</span>
    //     </div>
    //   ),
    //   content: (
    //     <DeleteDocumentForm
    //       formData={form}
    //       loading={loading}
    //       response={response}
    //       alertOpen={alertOpen}
    //       setAlertOpen={setAlertOpen}
    //       setResponse={setResponse}
    //       handleConfirm={handleDelete}
    //     />
    //   ),
    // },
  };
};
