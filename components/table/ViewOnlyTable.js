// ** React Imports
import { useMemo, useState } from "react";

// ** MUI Imports
import { DataGrid } from "@mui/x-data-grid";

// ** Custom Components
import { useCustomStyles } from "@/app/style/table.style";

// ** Utils
import ViewOnlyTableToolbar from "./toolbar/ViewOnlyTableToolbar";
import PrimaryCard from "../card/primaryCard";

const ViewOnlyTable = (props) => {
  const {
    columns,
    rows,
    totalData,
    titleRightText = "",
    titleLeftText = "",
    pathnameTo,
    queryName,
  } = props;

  // ** States
  const [totalDataState] = useState(totalData);

  const { dataGridViewOnlySx } = useCustomStyles();

  const columnMemo = useMemo(() => {
    return columns;
  }, [columns]);

  return (
    <>
      <PrimaryCard sx={{ padding: 0 }}>
        <DataGrid
          autoHeight
          sx={dataGridViewOnlySx}
          columns={columnMemo}
          rowHeight={58}
          slots={{
            toolbar: ViewOnlyTableToolbar,
          }}
          slotProps={{
            toolbar: {
              titleLeftText: titleLeftText,
              titleRightText: titleRightText,
              pathnameTo: pathnameTo,
              queryName: queryName,
            },
          }}
          rows={rows}
          rowCount={totalDataState}
          getRowId={(row) => (row.id ? row.id : row._id)}
          disableColumnFilter
          hideFooterPagination
          hideFooterSelectedRowCount
        />
      </PrimaryCard>
    </>
  );
};

export default ViewOnlyTable;
