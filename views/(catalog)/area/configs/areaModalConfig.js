import AddAreasForm from "../components/(form)/AddAreasForm";

export const areaModalConfig = (state) => {
  const { loading, response, setResponse, handleCreate, handleModalClose } = state;

  return {
    add: {
      title: "Create Area",
      content: (
        <AddAreasForm
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