// ** Mui Imports
import { Typography } from "@mui/material";

// ** Style Imports
import { columnDefaultSx } from "@/app/style/column.style";

export const reportChannelColumn = [
  {
    flex: 0.1,
    minWidth: 100,
    align: "left",
    field: "id",
    headerName: "No",
    hideSortIcons: true,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const sortedRowIds = params.api.getSortedRowIds();
      const rowIndex = sortedRowIds.indexOf(params.id);

      return (
        <Typography noWrap variant="body2" sx={columnDefaultSx}>
          {rowIndex + 1}
        </Typography>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 100,
    align: "left",
    field: "channelName",
    headerName: "Channel Name",
    hideSortIcons: true,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const { row } = params;

      return (
        <Typography noWrap variant="body2" sx={columnDefaultSx}>
          {row?.channelName?.includes("~~")
            ? row?.channelName.split("~~")[1]
            : row?.channelName}
        </Typography>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 100,
    align: "left",
    field: "categoryName",
    headerName: "Channel Category",
    hideSortIcons: true,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const { row } = params;

      return (
        <Typography noWrap variant="body2" sx={columnDefaultSx}>
          {row?.categoryName?.includes("~~")
            ? row?.categoryName.split("~~")[1]
            : row?.categoryName}
        </Typography>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 100,
    align: "left",
    field: "totalDevice",
    headerName: "Total Device",
    hideSortIcons: true,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const { row } = params;

      return (
        <Typography noWrap variant="body2" sx={columnDefaultSx}>
          {row.totalDevice}
        </Typography>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 100,
    align: "left",
    field: "averageTime",
    headerName: "Average Time",
    hideSortIcons: true,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const { row } = params;

      return (
        <Typography noWrap variant="body2" sx={columnDefaultSx}>
          {row.averageTime}
        </Typography>
      );
    },
  },
];

export const reportCategoryChannelColumn = [
  {
    flex: 0.1,
    minWidth: 100,
    align: "left",
    field: "id",
    headerName: "No",
    hideSortIcons: true,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const sortedRowIds = params.api.getSortedRowIds();
      const rowIndex = sortedRowIds.indexOf(params.id);

      return (
        <Typography noWrap variant="body2" sx={columnDefaultSx}>
          {rowIndex + 1}
        </Typography>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 100,
    align: "left",
    field: "categoryName",
    headerName: "Channel Category",
    hideSortIcons: true,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const { row } = params;

      return (
        <Typography noWrap variant="body2" sx={columnDefaultSx}>
          {row.categoryName}
        </Typography>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 100,
    align: "left",
    field: "totalDevice",
    headerName: "Total Device",
    hideSortIcons: true,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const { row } = params;

      return (
        <Typography noWrap variant="body2" sx={columnDefaultSx}>
          {row.totalDevice}
        </Typography>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 100,
    align: "left",
    field: "averageTime",
    headerName: "Average Time",
    hideSortIcons: true,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const { row } = params;

      return (
        <Typography noWrap variant="body2" sx={columnDefaultSx}>
          {row.averageTime}
        </Typography>
      );
    },
  },
];
