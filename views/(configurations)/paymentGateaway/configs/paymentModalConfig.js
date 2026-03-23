import EditPaymentForm from "../components/(form)/EditPaymentInfo";
import EditTransactionForm from "../components/(form)/EditTransactionSetting";

export const paymentModalConfig = (state) => {
  const { loading, response, setResponse, handleCreate, handleModalClose, selectedData } = state;

  return {
    update: {
      title: "Edit Payment Gateway",
      content: (
        <EditPaymentForm
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
        <EditTransactionForm
          loading={loading}
          handleModalClose={handleModalClose}
          initialData={selectedData} 
        />
      )
    },
  };
};