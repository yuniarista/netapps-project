import AddWhatsAppForm from "../components/(form)/AddWhatsAppForm";

export const whatsAppModalConfig = (state) => {
  const { loading, response, setResponse, handleCreate, handleModalClose } = state;

  return {
    add: {
      title: "Create WhatsApp Gateway",
      content: (
        <AddWhatsAppForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
          handleModalClose={handleModalClose} // Kirim fungsi close ke form
        />
      )
    },
  };
};