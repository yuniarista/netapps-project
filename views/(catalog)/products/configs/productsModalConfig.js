import { TriangleAlert } from "lucide-react";
import AddProductsForm from "../components/(form)/AddProductsForm";
import EditProductsForm from "../components/(form)/EditProductForm";

import DeleteForm from "../components/(form)/deleteForm";

export const productsModalConfig = (state) => {
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
    edit: {
      title: "Edit Product",
      content: (
        <EditProductsForm
          formData={form}
          formOptions={formOptions}
          loading={loading}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          response={response}
          setResponse={setResponse}
          handleUpdate={handleUpdate}
        />
      ),
    },
};
}
