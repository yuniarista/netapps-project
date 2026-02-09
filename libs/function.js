import { data } from "autoprefixer";

export const fetchClient = async ({ uri }) => {
  const body = {
    uri,
    method: "GET"
  };
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      next: {
        revalidate: 0
      }
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("err", error.message);
  }
};

export const basicFetch = async ({ uri }) => {
  const body = {
    uri,
    method: "GET"
  };
  try {
    const res = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("err", error.message);
  }
};

export const FilterData = async ({
  uri,
  getUri,
  setLoading = undefined,
  paginationModel,
  filterParams
}) => {
  setLoading !== undefined && setLoading(true);
  try {
    const params = new URLSearchParams({
      page: paginationModel.pageIndex ?? 1,
      limit: paginationModel && paginationModel.pageLimit
    });

    if (filterParams) {
      filterParams.forEach((value) => {
        params.append(value.key, value.value);
      });
    }
    const dataFetch = await fetchClient({
      uri: `${getUri ? getUri : uri}?${params}`
    });
    return dataFetch;
  } catch (error) {
    console.error("err", error);
  } finally {
    setLoading !== undefined && setLoading(false);
  }
};

export const CreateIdData = async ({
  uri,
  select,
  getUri,
  setData,
  setModal,
  DataForm,
  setLoading,
  setResponse,
  filterParams,
  paginationModel,
  setPaginationModel,
  isAuth = true
}) => {
  setResponse({});
  setLoading(true);
  const body = {
    uri,
    ...DataForm,
    method: "POST"
  };
  const localApi = isAuth ? "authApi" : "baseApi";
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + localApi, {
      method: "POST",
      body: JSON.stringify(body)
    });

    const response = await res.json();
    if (res.ok) {
      const pageLimit = paginationModel.pageLimit;

      const params = new URLSearchParams({
        page: 1,
        limit: pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }

      const dataFetch = await fetchClient({
        uri: `${getUri ? getUri : uri}?${params}`
      });

      setData(dataFetch);
      setResponse({ status: "success", message: "Data Created Successfully!" });
      setPaginationModel({ pageIndex: 0, pageLimit });
      setModal(false);
      return response.id;
    } else if (res.status === 401) {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error("err", error);
  } finally {
    setLoading(false);
  }
};

export const UpdateIdData = async ({
  uri,
  getUri,
  select,
  setData,
  setModal,
  DataForm,
  setLoading,
  setResponse,
  paginationModel,
  filterParams
}) => {
  setLoading(true);
  const body = {
    ...DataForm,
    uri: `${uri}/${DataForm.id}`,
    method: "PUT"
  };

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      body: JSON.stringify(body)
    });

    const response = await res.json();

    if (res.ok) {
      const pageLimit = paginationModel.pageLimit;

      const params = new URLSearchParams({
        page: 1,
        limit: pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }

      const getUriCustom = getUri && getUri?.split("?");

      const dataFetch = await fetchClient({
        uri: `${
          getUri ? (getUriCustom.length === 2 ? getUriCustom[0] : getUri) : uri
        }?${params}`
      });
      setData(dataFetch);
      setResponse({
        data: {},
        status: "success",
        message: "Data Updated Successfully!"
      });
      setModal(false);
      return response.id;
    } else if (res.status === 401) {
      setResponse({
        status: "error",
        message: response?.message,
        error: response?.error
      });
    }
  } catch (error) {
    console.error("err", error);
  } finally {
    setLoading(false);
  }
};

export const CreateData = async ({
  uri,
  select,
  getUri,
  setData,
  setModal,
  DataForm,
  setLoading,
  setResponse,
  filterParams,
  paginationModel,
  setPaginationModel,
  withRouting = false,
  isAuth = true
}) => {
  setResponse({});
  setLoading(true);
  const body = {
    uri,
    ...DataForm,
    method: "POST"
  };
  const localApi = isAuth ? "authApi" : "baseApi";
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + localApi, {
      method: "POST",
      body: JSON.stringify(body)
    });

    const response = await res.json();
    if (res.ok) {
      const pageLimit = paginationModel.pageLimit;

      const params = new URLSearchParams({
        page: 1,
        limit: pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }

      const dataFetch = await fetchClient({
        uri: `${getUri ? getUri : uri}?${params}`
      });

      setData(dataFetch);
      setResponse({
        data: {},
        route: withRouting ? withRouting : undefined,
        status: "success",
        message: "Data Created Successfully!"
      });
      setPaginationModel({ pageIndex: 0, pageLimit });
      setModal(false);
    } else if (res.status === 401) {
      setResponse({
        status: "error",
        message: response.message,
        error: response.error
      });
    }
  } catch (error) {
    console.error("err", error);
  } finally {
    setLoading(false);
  }
};

export const UpdateData = async ({
  uri,
  getUri,
  select,
  setData,
  setModal,
  DataForm,
  setLoading,
  setResponse,
  paginationModel,
  withRouting = false,
  filterParams
}) => {
  setLoading(true);
  const body = {
    ...DataForm,
    uri: `${uri}/${DataForm.id}`,
    method: "PUT"
  };

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      body: JSON.stringify(body)
    });

    const response = await res.json();

    if (res.ok) {
      const pageLimit = paginationModel.pageLimit;

      const params = new URLSearchParams({
        page: 1,
        limit: pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }

      const getUriCustom = getUri && getUri?.split("?");

      const dataFetch = await fetchClient({
        uri: `${
          getUri ? (getUriCustom.length === 2 ? getUriCustom[0] : getUri) : uri
        }?${params}`
      });
      setData(dataFetch);
      setResponse({
        data: {},
        route: withRouting ? withRouting : undefined,
        status: "success",
        message: "Data Updated Successfully!"
      });
      setModal(false);
    } else if (res.status === 401) {
      setResponse({
        status: "error",
        message: response?.message,
        error: response?.error
      });
    }
  } catch (error) {
    console.error("err", error);
  } finally {
    setLoading(false);
  }
};
export const PatchData = async ({
  uri,
  getUri,
  select,
  setData,
  setModal,
  DataForm,
  setLoading,
  setResponse,
  paginationModel,
  filterParams
}) => {
  setLoading(true);
  const body = {
    ...DataForm,
    uri: `${uri}/${DataForm.id}`,
    method: "PATCH"
  };

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      body: JSON.stringify(body)
    });
    const response = await res.json();

    if (res.ok) {
      const pageLimit = paginationModel.pageLimit;

      const params = new URLSearchParams({
        page: 1,
        limit: pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }

      const getUriCustom = getUri && getUri?.split("?");

      const dataFetch = await fetchClient({
        uri: `${
          getUri ? (getUriCustom.length === 2 ? getUriCustom[0] : getUri) : uri
        }?${params}`
      });
      setData(dataFetch);
      setResponse({
        data: {},
        status: "success",
        message: "Data Updated Successfully!"
      });
      setModal(false);
    } else if (res.status === 401) {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error("err", error);
  } finally {
    setLoading(false);
  }
};

export const MoveUp = async ({
  id,
  uri,
  getUri,
  select,
  setData,
  setModal,
  setLoading,
  setResponse,
  paginationModel,
  filterParams
}) => {
  setLoading(true);
  const body = {
    uri: `${uri}/move-up/${id}`,
    method: "PUT"
  };
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      body: JSON.stringify(body)
    });
    const response = await res.json();
    if (res.ok) {
      const params = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }

      const dataFetch = await fetchClient({
        uri: `${getUri ? getUri : uri}?${params}`
      });

      setData(dataFetch.data);
      setResponse({
        data: response.data,
        status: "success",
        message: "Data Order Updated Successfully!"
      });
      setModal(null);
    } else {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const MoveDown = async ({
  id,
  uri,
  getUri,
  select,
  setData,
  setModal,
  setLoading,
  setResponse,
  paginationModel,
  filterParams
}) => {
  setLoading(true);
  const body = {
    uri: `${uri}/move-down/${id}`,
    method: "PUT"
  };
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      body: JSON.stringify(body)
    });
    const response = await res.json();
    if (res.ok) {
      const params = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }

      const dataFetch = await fetchClient({
        uri: `${getUri ? getUri : uri}?${params}`
      });

      setData(dataFetch.data);
      setResponse({
        data: response.data,
        status: "success",
        message: "Data Order Updated Successfully!"
      });
      setModal(null);
    } else {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const UpdateStatus = async ({
  id,
  uri,
  getUri,
  select,
  setData,
  setModal,
  setLoading,
  setResponse,
  paginationModel,
  filterParams
}) => {
  setLoading(true);
  const body = {
    uri: `${uri}/activate/${id}`,
    method: "PATCH"
  };
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      body: JSON.stringify(body)
    });
    const response = await res.json();
    if (res.ok) {
      const params = new URLSearchParams({
        page: paginationModel.pageIndex + 1,
        limit: paginationModel.pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }

      const dataFetch = await fetchClient({
        uri: `${getUri ? getUri : uri}?${params}`
      });

      setData(dataFetch);
      setResponse({
        data: response.data,
        status: "success",
        message: "Data Status Updated Successfully!"
      });
      setModal(null);
    } else {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const UpdateStatusCustom = async ({
  id,
  uri,
  date,
  getUri,
  select,
  setData,
  setModal,
  setLoading,
  setResponse,
  typeResponse,
  paginationModel,
  filterParams
}) => {
  setLoading(true);
  const body = {
    uri: `${uri}/${id}`,
    method: "PUT",
    checkOut: date ? date : ""
  };

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      body: JSON.stringify(body)
    });
    const response = await res.json();
    if (res.ok) {
      const params = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }

      const getUriCustom = getUri && getUri.split("?")[0];

      const dataFetch = await fetchClient({
        uri: `${!params ? getUri : getUriCustom}?${params}`
      });

      setData(dataFetch.data);
      setResponse({
        status: "success",
        message: response.message,
        type: typeResponse ?? ""
      });
      setModal(null);
    } else {
      setResponse({
        status: "error",
        message: response.message,
        type: typeResponse ?? ""
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const DeleteData = async ({
  id,
  uri,
  select,
  getUri,
  setData,
  setModal,
  setLoading,
  setResponse,
  paginationModel,
  setPaginationModel,
  filterParams
}) => {
  setLoading(true);
  const body = {
    uri: `${uri}/${id}`,
    method: "DELETE"
  };
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      body: JSON.stringify(body)
    });
    const response = await res.json();

    if (res.status === 200) {
      const pageLimit = paginationModel.pageLimit;

      const params = new URLSearchParams({
        page: 1,
        limit: pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }
      const dataFetch = await fetchClient({
        uri: `${getUri ? getUri : uri}?${params}`
      });
      setPaginationModel({ pageIndex: 0, pageLimit });
      setData(dataFetch);
      setResponse({
        data: response.data,
        status: "success",
        message: "Data Deleted Successfully!"
      });
      setModal(null);
    } else {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error("error", error);
  } finally {
    setLoading(false);
  }
};

export const BulkDeleteData = async ({
  ids,
  uri,
  select,
  getUri,
  setData,
  setModal,
  setLoading,
  setResponse,
  paginationModel,
  setPaginationModel,
  filterParams
}) => {
  setLoading(true);
  const body = {
    uri: `${uri}/removes`,
    method: "DELETE",
    ids: ids
  };
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      body: JSON.stringify(body)
    });
    const response = await res.json();

    if (res.status === 200) {
      const pageLimit = paginationModel.pageLimit;

      const params = new URLSearchParams({
        page: 1,
        limit: pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }
      const dataFetch = await fetchClient({
        uri: `${getUri ? getUri : uri}?${params}`
      });
      setPaginationModel({ pageIndex: 0, pageLimit });
      setData(dataFetch);
      setResponse({
        data: response.data,
        status: "success",
        message: "Data Deleted Successfully!"
      });
      setModal(null);
    } else {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error("error", error);
  } finally {
    setLoading(false);
  }
};

export const UpdateCustomStatus = async ({
  id,
  uri,
  status,
  getUri,
  select,
  setData,
  setModal,
  setLoading,
  setResponse,
  paginationModel,
  filterParams
}) => {
  setLoading(true);
  const body = {
    status: status,
    uri: `${uri}/status/${id}`,
    method: "PATCH"
  };
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      body: JSON.stringify(body)
    });

    const response = await res.json();
    if (res.status === 200) {
      const params = new URLSearchParams({
        page: paginationModel.pageIndex + 1,
        limit: paginationModel.pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }

      const dataFetch = await fetchClient({
        uri: `${getUri ? getUri : uri}?${params}`
      });

      setData(dataFetch);
      setResponse({
        status: "success",
        message: "Data Status Updated Successfully!"
      });
      setModal(null);
    } else {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const CreateFormData = async ({
  uri,
  getUri,
  select,
  setData,
  setModal,
  formData,
  setLoading,
  setResponse,
  typeResponse,
  socketResponse,
  paginationModel,
  setPaginationModel,
  filterParams
}) => {
  setLoading(true);

  let body;
  if (!socketResponse) {
    formData.append("uri", uri);
    body = formData;
  }

  let res = {};
  let response = {};
  let statusCode = "";
  let responseMessage = "";
  let responseData = {};

  try {
    setResponse({});
    if (socketResponse) {
      res = socketResponse;
      statusCode = res.statusCode;
    } else {
      res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "formData", {
        method: "POST",
        body: body
      });
      statusCode = res.status;
      response = await res.json();
      responseData = response.data;
      responseMessage = response.message;
    }
    if (statusCode === 200) {
      // const page =
      //   data.totalData % paginationModel.pageLimit == 0
      //     ? data.totalPages
      //     : data.totalPages - 1;
      const pageLimit = paginationModel.pageLimit;

      const params = new URLSearchParams({
        page: 1,
        limit: pageLimit,
        select: select ?? ""
      });

      if (filterParams) {
        filterParams.forEach((value) => {
          params.append(value.key, value.value);
        });
      }

      const dataFetch = await fetchClient({
        uri: `${getUri ? getUri : uri}?${params}`
      });
      setData(dataFetch);
      setPaginationModel({ page: 0, pageLimit });
      setResponse({
        status: "success",
        message: "Data Added Successfully!",
        type: typeResponse ?? "",
        data: responseData ?? {}
      });
      setModal(null);
    } else if (res.status === 401) {
      setResponse({
        status: "error",
        message: responseMessage,
        error: response?.error,
        type: typeResponse ?? ""
      });
    }
  } catch (error) {
    setResponse({
      status: "error",
      message: responseMessage,
      error: response?.error,
      type: typeResponse ?? ""
    });
    console.error("err", error.message);
  } finally {
    setLoading(false);
  }
};

export const UpdateFormData = async ({
  id,
  uri,
  getUri,
  select,
  setData,
  setModal,
  formData,
  setLoading,
  setResponse,
  typeResponse,
  socketResponse,
  paginationModel,
  filterParams
}) => {
  setLoading(true);

  let body;
  if (!socketResponse) {
    formData?.append("uri", `${uri}/${id}`);
    body = formData;
  }

  try {
    let res = {};
    let response = {};
    let statusCode = "";
    let responseMessage = "";
    let responseData = {};

    if (socketResponse) {
      res = socketResponse;
      statusCode = res.statusCode;
      responseMessage = res.message;
    } else {
      res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "formData", {
        method: "PUT",
        body: body
      });

      statusCode = res.status;
      response = await res.json();
      responseData = response.data;
      responseMessage = response.message;
    }

    if (statusCode === 200) {
      let dataFetch;
      // this check if update data has data table
      const pageLimit = paginationModel.pageLimit;

      if (paginationModel) {
        const params = new URLSearchParams({
          page: 1,
          limit: pageLimit,
          select: select ?? ""
        });

        if (filterParams) {
          filterParams.forEach((value) => {
            params.append(value.key, value.value);
          });
        }

        dataFetch = await fetchClient({
          uri: `${getUri ?? uri}?${params}`
        });
      } else {
        dataFetch = await fetchClient({
          uri: `${getUri ? getUri : uri}`
        });
      }

      setData(dataFetch);
      setResponse({
        status: "success",
        message: responseMessage,
        type: typeResponse ?? "",
        data: responseData.data ?? {}
      });
      setModal(null);
    } else if (statusCode === 401) {
      setResponse({
        status: "error",
        message: responseMessage,
        type: typeResponse ?? ""
      });
    }
  } catch (error) {
    console.error("err", error);
  } finally {
    setLoading(false);
  }
};

export const SwitchFacilities = async ({
  uri,
  propertyId,
  setLoading,
  setResponse,
  setSwitchState,
  availableProperty
}) => {
  setLoading(true);
  const body = {
    uri: `${uri}/${propertyId}`,
    method: "PUT",
    availableProperty
  };

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
      method: "POST",
      body: JSON.stringify(body)
    });
    const response = await res.json();
    if (res.status === 200) {
      setSwitchState((prevSwitchState) => !prevSwitchState);
      setResponse({
        data: response.data,
        status: "success",
        message: "Facility Status Updated Successfully!"
      });
    } else if (res.status === 401) {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error("err", error);
  } finally {
    setLoading(false);
  }
};

export const CreateDataOnly = async ({
  uri,
  DataForm,
  setLoading,
  setResponse,
  isAuth = true
}) => {
  setResponse({});
  setLoading(true);
  const body = {
    uri,
    ...DataForm,
    method: "POST"
  };
  const localApi = isAuth ? "authApi" : "baseApi";
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + localApi, {
      method: "POST",
      body: JSON.stringify(body)
    });

    const response = await res.json();
    if (res.ok) {
      setResponse({
        status: "success",
        message: "Data Added Successfully!",
        data: response?.data
      });
    } else if (res.status === 401) {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error("err", error);
  } finally {
    setLoading(false);
  }
};

export const UpdateDataOnly = async ({
  uri,
  DataForm,
  setLoading,
  setResponse,
  isAuth = true
}) => {
  setLoading(true);
  const body = {
    ...DataForm,
    uri: `${uri}/${DataForm.id}`,
    method: "PUT"
  };
  const localApi = isAuth ? "authApi" : "baseApi";
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + localApi, {
      method: "POST",
      body: JSON.stringify(body)
    });

    const response = await res.json();
    if (res.ok) {
      setResponse({ status: "success", message: "Data Updated Successfully!" });
    } else if (res.status === 401) {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error("err", error);
  } finally {
    setLoading(false);
  }
};

export const SwitchPropertyLanguage = async ({
  uri,
  setLoading,
  setResponse,
  setSwitchState,
  propertyLanguage
}) => {
  setLoading(true);
  const body = {
    uri: `${uri}`,
    method: "PUT",
    languageList: propertyLanguage
  };

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "baseApi", {
      method: "POST",
      body: JSON.stringify(body)
    });
    const response = await res.json();

    if (res.status === 200) {
      setSwitchState((prevSwitchState) => !prevSwitchState);
      setResponse({
        status: "success",
        message: "Property Language Status Updated Successfully!"
      });
    } else if (res.status === 401) {
      setResponse({ status: "error", message: response.message });
    }
  } catch (error) {
    console.error("err", error);
  } finally {
    setLoading(false);
  }
};
