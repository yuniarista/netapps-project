// feature/utils/useFeatureHandlers.js
import {
  CreateData,
  CreateFormData,
  UpdateData,
  DeleteData,
  BulkDeleteData,
} from "@/libs/function";

export const useRequestedCustomersHandlers = ({
  uri,
  socket,
  reset,
  setData,
  setLoading,
  setResponse,
  setPaginationModel,
  setSelectedRows,
  setAlertOpen,
  setModal,
  filterParams,
  form
}) => {
  // const handleCreate = async (DataForm) => {
  //   const formData = new FormData();
  //   const fileToUse = DataForm.npwpPhoto || DataForm.housePhoto || DataForm.cardPhoto;
  //   DataForm.fileName = fileToUse?.name || "no-file";
  //   DataForm.type = "Documents";
  //   DataForm.fromUrl = "local";
  //   for (const item in DataForm) {
  //     formData.append(item, DataForm[item]);
  //   }
  //   await CreateFormData({
  //     uri,
  //     reset,
  //     setData,
  //     formData,
  //     setLoading,
  //     setResponse,
  //     paginationModel: { pageIndex: 0, pageLimit: 10 },
  //     setPaginationModel,
  //     setModal,
  //     filterParams
  //   });
  //   // setAlertOpen(true);
  // };

  const handleCreate = (DataForm) => {
    return CreateData({
      uri,
      setData,
      DataForm,
      setLoading,
      setResponse,
      paginationModel: { pageIndex: 0, pageLimit: 10 },
      setPaginationModel,
      setModal,
      filterParams
    });
  };

  const handleUpdate = async (DataForm) => {
    DataForm.id = form?.id;
    await UpdateData({
      uri,
      setData,
      setLoading,
      setResponse,
      DataForm,
      paginationModel: { pageIndex: 0, pageLimit: 10 },
      setPaginationModel,
      setModal,
      filterParams
    });
    // setAlertOpen(true);
  };

  const handleDelete = () =>
    DeleteData({
      id: form?.id,
      uri,
      setData,
      setLoading,
      setResponse,
      paginationModel: { pageIndex: 0, pageLimit: 10 },
      setPaginationModel,
      setModal,
      filterParams
    });

  const handleBulkDelete = async (ids) => {
    await BulkDeleteData({
      ids,
      uri,
      setData,
      setModal,
      setLoading,
      setResponse,
      setPaginationModel,
      paginationModel: { pageIndex: 0, pageLimit: 10 },
      filterParams
    });
    setSelectedRows({});
  };

  return { handleCreate, handleUpdate, handleDelete, handleBulkDelete };
};
