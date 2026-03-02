import EditPaymentGateway from "../components/(form)/EditPaymentGateway";
import EditTransactionSetting from "../components/(form)/EditTransactionSetting";

export const paymentModalConfig = (state) => {
  const { loading, response, setResponse, handleCreate, handleModalClose, selectedData } = state;

  return {
    update: {
      title: "Edit Payment Gateway",
      content: (
        <EditPaymentGateway
          loading={loading}
          handleModalClose={handleModalClose}
          // handleUpdate={handleUpdate} // Jika ada fungsi update
        />
      )
    },
    edit: {
      title: "Edit Transaction Setting",
      content: (
        <EditTransactionSetting
          loading={loading}
          handleModalClose={handleModalClose}
        />
      )
    },
  };
};