import { GlobalContext } from "@/context/globalContext";
import { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { tr } from "zod/v4/locales";

export const UseISPState = (initialData = []) => {
  const [form, setForm] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [data, setData] = useState(initialData);
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

   const [paginationModel, setPaginationModel] = useState({
    pageIndex: 0,
    pageLimit: 10
  });

  // const { globalCtx } = useContext(GlobalContext);
  // const socket = globalCtx.socket;

   const [nameFilter, setNameFilter] = useState("");
  const [sortDataBy, setSortDataBy] = useState("");

  const {reset} = useForm();
  const handleModalOpen = useCallback((type, item = null) => {
    setModalType(type);
    setForm(item);
    setOpenModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalType(false);
    setForm(null);
    setOpenModal(null);
  }, []);

  return {
    form,
    // socket,
    reset,
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
    handleModalOpen,
    handleModalClose,
    // selectedRows,
    // setSelectedRows,
    // filterParams,
    // setFilterParams,
    // nameFilter,
    // setNameFilter,
    // isFiltering,
    // hasMore,
    // setHasMore,
    // setIsFiltering,
    // sortDataBy,
    // setSortDataBy,
    // alertOpen,
    // setAlertOpen
  }

  

};
