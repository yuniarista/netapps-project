import { TriangleAlert } from "lucide-react";
import AddInvoiceForm from "../components/(form)/AddInvoiceForm";
import GenerateInvoiceForm from "../components/(form)/GenerateForm";
import InvoiceDetail from "../components/(component)/InvoiceDetails";
import { size } from "zod";
import DeleteForm from "../components/(form)/deleteForm";


export const invoiceModalConfig = (state) => {
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
      title: "Create Invoice",
      content: (
        <AddInvoiceForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
          handleModalClose={handleModalClose} // Kirim fungsi close ke form
        />
      ),
    },
    adds: {
      title: "Generate Invoice",
      description: "The system will automatically scan and generate invoices for Active customers while skipping those who already have an invoice for the selected period to prevent double billing",
      content: (
        <GenerateInvoiceForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
          handleModalClose={handleModalClose} // Kirim fungsi close ke form
        />
      ),
    },
    detail: {
      title: `Invoice Details - ${form?.noInvoice}`,
      content: (
        <InvoiceDetail  data={form}
          // loading={loading}
          // response={response}
          // setResponse={setResponse}
          // handleCreate={handleCreate}
          // handleModalClose={handleModalClose} // Kirim fungsi close ke form
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
    // edit: {
    //   title: "Edit Product",
    //   content: (
    //     <EditProductsForm
    //       formData={form}
    //       formOptions={formOptions}
    //       loading={loading}
    //       alertOpen={alertOpen}
    //       setAlertOpen={setAlertOpen}
    //       response={response}
    //       setResponse={setResponse}
    //       handleUpdate={handleUpdate}
    //     />
    //   ),
    // },
};
}
