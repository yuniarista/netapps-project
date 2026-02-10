import AddInvoiceForm from "../components/(form)/AddInvoiceForm";

export const invoiceModalConfig = (state) => {
  const { loading, response, setResponse, handleCreate, handleModalClose } = state;

  return {
    add: {
      title: "Create Invoice Template",
      content: (
        <AddInvoiceForm
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