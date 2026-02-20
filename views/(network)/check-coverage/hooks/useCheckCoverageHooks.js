import { useState, useCallback, useEffect } from "react";

export const useCheckCoverageState = (initialData = []) => {
  const [form, setForm] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [data, setData] = useState(initialData);
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageIndex: 0,
    pageLimit: 10,
  });
  const [selectedRows, setSelectedRows] = useState({});
  const [filterParams, setFilterParams] = useState([]);
  const [alertOpen, setAlertOpen] = useState(!!response?.status);

  const handleModalOpen = useCallback((type, item = null) => {
    setModalType(type);
    setForm(item);
    setOpenModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setOpenModal(false);
    setForm(null);
    setModalType(null);
  }, []);

  useEffect(() => {
    // open whenever status changes (including same truthy value with new message)
    setAlertOpen(!!response?.status);
  }, [response]);

  return {
    form,
    setForm,
    openModal,
    setOpenModal,
    modalType,
    setModalType,
    data,
    setData,
    response,
    setResponse,
    loading,
    setLoading,
    paginationModel,
    setPaginationModel,
    alertOpen,
    setAlertOpen,
    handleModalOpen,
    handleModalClose,
    selectedRows,
    setSelectedRows,
    filterParams,
    setFilterParams,
  };
};
