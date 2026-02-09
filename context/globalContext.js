"use client";
import { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [socket, setSocket] = useState(undefined);
  const [modalSecondLayer, setModalSecondLayer] = useState("");
  const [roomTypeData, setRoomTypeData] = useState([]);
  const [responseCtx, setResponseCtx] = useState({});
  const [loadingCtx, setLoadingCtx] = useState(false);
  const [formCtx, setFormCtx] = useState([]);
  const [subscriptionProperty, setSubscriptionProperty] = useState([]);
  const [subscriptionProduct, setSubscriptionProduct] = useState("");
  const [subscriptionFeature, setSubscriptionFeature] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [isPaidVod, setIsPaidVod] = useState(false);

  const addRoomTypeData = ({ isReset, data }) => {
    let id = Date.now().toString(36).substring(0, 16);

    if (isReset) {
      setRoomTypeData([]);
      return;
    }

    setRoomTypeData([
      ...roomTypeData,
      {
        _id: id,
        ...data,
      },
    ]);
  };

  const editRoomTypeData = ({ id, newData }) => {
    const updatedRoomTypeData = roomTypeData.map((item) =>
      item._id === id ? { ...item, ...newData } : item
    );

    setRoomTypeData(updatedRoomTypeData);
  };

  const deleteRoomTypeData = (id) => {
    const findIndex = roomTypeData.findIndex((item) => {
      return item._id === id;
    });

    if (findIndex !== -1) {
      // ** _ it means we dont need the value but we jut need the index
      const updatedRoomTypeData = roomTypeData.filter(
        (_, index) => index !== findIndex
      );

      setRoomTypeData(updatedRoomTypeData);
    }
  };

  const contextValue = {
    globalCtx: {
      socket,
      modalSecondLayer,
      roomTypeData,
      responseCtx,
      loadingCtx,
      formCtx,
      subscriptionProperty,
      subscriptionProduct,
      subscriptionFeature,
      roomTypeList,
      isLoaded,
      isPaidVod,
    },
    globalAct: {
      setSocket,
      setModalSecondLayer,
      setRoomTypeData,
      setResponseCtx,
      setLoadingCtx,
      setFormCtx,
      addRoomTypeData,
      deleteRoomTypeData,
      editRoomTypeData,
      setSubscriptionProperty,
      setSubscriptionProduct,
      setSubscriptionFeature,
      setRoomTypeList,
      setIsLoaded,
      setIsPaidVod,
    },
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
