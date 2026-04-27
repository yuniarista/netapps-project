import AddAffiliateForm from "../components/(form)/AddAffiliate";
import DeleteAffiliateForm from "../components/(form)/DeleteAffiliateForm";
import EditAffiliateForm from "../components/(form)/EditAffiliate";

export const affiliateModalConfig = ({
  form,
  loading,
  response,
  setResponse,
  alertOpen,
  setAlertOpen,
  handleCreate,
  handleUpdate,
  handleDelete
}) => {
  return {
    add: {
      title: "Create Affiliate Sales",
      content: (
        <AddAffiliateForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleCreate={handleCreate}
          // handleModalClose={handleModalClose} // Kirim fungsi close ke form
        />
      )
    },
    edit: {
      title: "Edit Affiliate Sales",
      content: (
        <EditAffiliateForm
          form={form} 
          loading={loading}
          response={response}
          setResponse={setResponse}
          handleUpdate={handleUpdate}
          // handleModalClose={handleModalClose} // Kirim fungsi close ke form
        />
      )
    },
    delete: {
          title: "Confirm Delete",
          content: (
            <DeleteAffiliateForm
              loading={loading}
              response={response}
              setResponse={setResponse}
            />
          ),
        },
  };
};