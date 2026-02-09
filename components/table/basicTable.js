import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchClient } from "@/libs/function";
import { BasicTableStyle } from "@/libs/muiStyle";

export default function BasicTable({
  uri,
  data,
  getUri,
  select,
  option,
  isActiveUri,
  setData,
  columns,
  loading,
  paginationModel,
  setPaginationModel,
  hideFooter = false,
  fitHeightToRow = false
}) {
  const [load, setLoad] = useState(false);
  const [sortModel, setSortModel] = useState({
    field: "",
    sort: ""
  });
  const handlePageChange = async ({ event, sortModelProp }) => {
    setLoad(true);

    let sortModelObject = {};

    const sortModelField = sortModelProp?.field ?? sortModel?.field;
    const sortModelValue = sortModelProp?.sort ?? sortModel?.sort;

    if (sortModelField && sortModelValue) {
      sortModelObject = {
        [`sort[${sortModelField}]`]: sortModelValue
      };
    }

    const params = new URLSearchParams({
      page: event.page + 1,
      limit: event.pageLimit,
      select: select ?? "",
      ...(isActiveUri ? { isActive: isActiveUri } : {}),
      ...sortModelObject
    });

    if (option) {
      option.forEach((value) => {
        params.append(value.key, value.value);
      });
    }
    try {
      const dataFetch = await fetchClient({
        uri: `${getUri ?? uri}?${params}`
      });

      setData(dataFetch?.data);
      setPaginationModel({ page: event.page, pageLimit: event.pageLimit });
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const handleSort = (model) => {
    const sortModel = model[0];
    setSortModel(sortModel);

    handlePageChange({ event: paginationModel, sortModelProp: sortModel });
  };

  return (
    <>
      <DataGrid
        autoHeight
        columns={columns}
        disableColumnMenu
        sx={BasicTableStyle}
        paginationMode="server"
        rows={data?.list || []}
        pageLimitOptions={[10, 25, 50, 100]}
        loading={loading || load}
        disableRowSelectionOnClick
        rowCount={data?.totalData || 0}
        paginationModel={paginationModel}
        onPaginationModelChange={(event) => handlePageChange({ event })}
        onSortModelChange={handleSort}
        getRowId={(row) => (row.id ? row.id : row._id)}
        hideFooter={hideFooter}
        getRowClassName={(params) => {
          return params.row.statusCode >= 400 && params.row.statusCode <= 500
            ? "Mui-disabled-row"
            : "";
        }}
        checkboxSelection
        onRowSelectionModelChange={(e) => console.log(e)}
        getRowHeight={() => (fitHeightToRow ? "auto" : "")}
      />
    </>
  );
}
