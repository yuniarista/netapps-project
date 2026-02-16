import AddWhatsAppForm from "../components/(form)/AddWhatsAppForm";
import EditBilingForm from "../components/(form)/EditBilingForm";
import EditWhatsAppForm from "../components/(form)/EditWhatsAppForm";

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
    update: {
      title: "Edit WhatsApp Gateway",
      content: (
        <EditWhatsAppForm
          loading={loading}
          handleModalClose={handleModalClose}
          // handleUpdate={handleUpdate} // Jika ada fungsi update
        />
      )
    },
    edit: {
      title: "Edit Billing Template",
      content: (
        <EditBilingForm
          loading={loading}
          handleModalClose={handleModalClose}
          // initialData={selectedData} 
        />
      )
    },
  };
};