import AddWhatsAppForm from "../components/(form)/AddWhatsAppForm";
import EditBilingForm from "../components/(form)/EditBilingForm";
import EditTelegramForm from "../components/(form)/EditTelegramForm";

export const telegramModalConfig = (state) => {
  const { loading, response, setResponse, handleCreate, handleModalClose, selectedData } = state;

  return {
    add: {
      title: "Create Telegram Gateway",
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
      title: "Edit Telegram Gateway",
      content: (
        <EditTelegramForm
          loading={loading}
          handleModalClose={handleModalClose}
          // handleUpdate={handleUpdate} // Jika ada fungsi update
        />
      )
    },
    edit: {
      title: "Edit Invoice Created Template",
      className: "fixed left-[var(--sidebar-width,240px)] top-10 translate-y-0 rounded-r-none border-r-0 shadow-none",
      content: (
        <EditBilingForm
          loading={loading}
          handleModalClose={handleModalClose}
          initialData={selectedData} 
        />
      )
    },
  };
};