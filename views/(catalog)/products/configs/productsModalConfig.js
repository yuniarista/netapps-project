import AddProductsForm from "../components/(form)/AddProductsForm";
import DeleteForm from "../components/(form)/deleteForm";

export const productsModalConfig = (state) => {
  const { loading, response, setResponse, handleCreate, handleModalClose } =
    state;

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
      ),
    },
    delete: {
      title: "Confirm Delete",
      content: (
        <DeleteForm
          loading={loading}
          response={response}
          setResponse={setResponse}
        />
      ),
    },
  };
};
