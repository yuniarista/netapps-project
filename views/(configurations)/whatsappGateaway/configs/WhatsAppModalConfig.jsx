import AddWhatsAppForm from "../components/(form)/AddWhatsAppForm";

export const WhatsAppModalConfig = ({
  loading,
  response,
  setResponse,
  handleCreate,

}) => {

  return {
    add: {
      title: "Create Customer",
      content: (
        <AddWhatsAppForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
        />
      )
    },
    // edit: {
    //   title: "Edit Web Page",
    //   content: (
    //     <EditWebsitesForm
    //       formData={form}
    //       formOptions={formOptions}
    //       loading={loading}
    //       response={response}
    //       setResponse={setResponse}
    //       handleUpdate={handleUpdate}
    //     />
    //   )
    // },
    // "item-info": {
    //   title: "Used In",
    //   content: <ItemMediaInformation formData={form} />
    // },
    // delete: {
    //   title: "Confirm Delete",
    //   content: (
    //     <DeleteWebsitesForm
    //       formData={form}
    //       loading={loading}
    //       response={response}
    //       setResponse={setResponse}
    //       handleConfirm={handleDelete}
    //     />
    //   )
    // },
    // "push-to-screen": {
    //   title: "Set To Screen",
    //   content: (
    //     <SetToScreenForm
    //       formData={form}
    //       loading={loading}
    //       response={response}
    //       setResponse={setResponse}
    //       handleConfirm={handleSetToScreen}
    //       formOptions={formOptions}
    //     />
    //   )
    // },
    // "bulk-delete": {
    //   title: "Confirm Delete",
    //   content: (
    //     <DeleteWebsitesForm
    //       formData={form}
    //       loading={loading}
    //       response={response}
    //       setResponse={setResponse}
    //       handleConfirm={() =>
    //         handleBulkDelete(selectedRowsArr?.map((item) => item.id))
    //       }
    //     />
    //   )
    // }
  };
};
