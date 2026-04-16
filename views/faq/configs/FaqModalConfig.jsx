import AddFaqForm from "../components/(form)/AddFaqForm";
import DeleteForm from "../components/(form)/deleteForm";
import EditFaqForm from "../components/(form)/EditFaqForm";

export const FaqModalConfig = ({
  form,
  loading,
  response,
  setResponse,
  formOptions,
  alertOpen,
  setAlertOpen,
  handleCreate,
  handleUpdate,
  handleDelete,
  odpData,
  preSalesLeads,
  handleModalClose,
  isCoverageModalOpen,
  handleCloseCoverage,
  handleOpenCoverage,
}) => {
  return {
    add: {
      title: "Create FAQ",
      content: (
        <AddFaqForm
          loading={loading}
          response={response}
          setResponse={setResponse}
          formOptions={formOptions}
          handleCreate={handleCreate}
          handleModalClose={handleModalClose}
          isCoverageModalOpen={isCoverageModalOpen}
          handleCloseCoverage={handleCloseCoverage}
          handleOpenCoverage={handleOpenCoverage}
        />
      ),
    },
    edit: {
      title: "Edit FAQ",
      content: (
        <EditFaqForm
          formData={form}
          loading={loading}
          response={response}
          setResponse={setResponse}
          formOptions={formOptions}
          handleCreate={handleCreate}
          handleModalClose={handleModalClose}
          isCoverageModalOpen={isCoverageModalOpen}
          handleCloseCoverage={handleCloseCoverage}
          handleOpenCoverage={handleOpenCoverage}
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
    // coverage: {
    //   title: "Check Coverage",
    //   content: (
    //     <div className="flex flex-col h-[80vh]">
    //       <div className="flex flex-1 overflow-hidden">
    //         <CoverageMapForm odpData={odpData} preSalesLeads={preSalesLeads} />
    //       </div>
    //       <DialogClose asChild>
    //         <Button variant="primary" className="self-end p-4">
    //           Close
    //         </Button>
    //       </DialogClose>
    //     </div>
    //   ),
    // },
  };
};
