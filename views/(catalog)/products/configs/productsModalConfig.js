import AddProductsForm from "../components/(form)/AddProductsForm";

export const productsModalConfig = (state) => {
  const { loading, response, setResponse, handleCreate, handleModalClose } = state;

  return {
    add: {
      title: "Create Product",
      content: (
        <AddProductsForm
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