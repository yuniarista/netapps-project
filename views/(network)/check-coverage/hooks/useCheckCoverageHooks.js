import { useState, useCallback, useEffect } from "react";

export const useCheckCoverageState = (odpData) => {
  const [form, setForm] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [data, setData] = useState();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageIndex: 0,
    pageLimit: 10,
  });
  const [selectedRows, setSelectedRows] = useState({});
  const [filterParams, setFilterParams] = useState([]);
  const [alertOpen, setAlertOpen] = useState(!!response?.status);
  const networkData = true;
  const [selectedLead, setSelectedLead] = useState(null);
  const [radius, setRadius] = useState([250]);
  const [L, setL] = useState(null);

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

  useEffect(() => {
    const initLeaflet = async () => {
      const L = (await import("leaflet")).default;
      setL(L);

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        // Ganti URL ke marker warna merah
        iconRetinaUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    };

    initLeaflet();
  }, []);

  // Fungsi untuk membuat icon titik hijau (Homepass)
  const createHomepassIcon = (L) => {
    return new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      iconRetinaUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius bumi dalam meter
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Jarak dalam meter
  };

  // Hitung homepass yang masuk dalam radius secara real-time
  const coveredHomepassesByODP = selectedLead
    ? odpData
        .map((odp) => ({
          ...odp,
          // Filter homepass di dalam ODP ini yang masuk radius
          homepasses: odp.homepasses.filter((hp) => {
            const dist = getDistance(
              selectedLead.lat,
              selectedLead.lng,
              hp.lat,
              hp.lng,
            );
            return dist <= radius[0];
          }),
        }))
        .filter((odp) => odp.homepasses.length > 0) // Hanya ambil ODP yang punya homepass masuk radius
    : [];

  const isCovered = coveredHomepassesByODP.length > 0;

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
    networkData,
    selectedLead,
    setSelectedLead,
    radius,
    setRadius,
    L,
    setL,
    createHomepassIcon,
    getDistance,
    coveredHomepassesByODP,
    isCovered,
  };
};
