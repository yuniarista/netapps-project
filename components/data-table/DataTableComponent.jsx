"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import LoadingCircle from "../loadingCircle";
import { FilterData } from "@/libs/function";
import { cn } from "@/lib/utils";

export default function DataTableComponent({
  uri,
  data,
  columns,
  sorting,
  setSorting,
  pagination,
  filterParams,
  selectedRows = [],
  setSelectedRows,
  setPagination,
  columnFilters,
  filterComponent,
  setColumnFilters,
  withoutRowsFilter = false,
  withoutRowsSelected = false,
  withoutPagination = false
}) {
  const [manipulatedData, setManipulatedData] = useState(data);
  const [presentedData, setPresentedData] = useState(
    Array.isArray(data?.data) ? data.data : []
  );

  const [loading, setLoading] = useState(false);

  const totalData = manipulatedData?.totalData || 0;
  const totalPage = Math.ceil(totalData / pagination.pageLimit);

  const safeData = Array.isArray(presentedData)
    ? presentedData
    : // handle 0 / "0" / null / undefined sebagai empty
    presentedData === 0 || presentedData === "0" || !presentedData
      ? []
      : // kalau object tunggal, kamu bisa pilih mau [] atau [object]
      // di sini kita kosongkan biar konsisten
      [];

  const table = useReactTable({
    data: safeData,
    columns,
    state: {
      pagination,
      sorting,
      columnFilters,
      rowSelection: selectedRows
      // rowSelection: Object.fromEntries(
      //   Object.keys(selectedRows).map((id) => [id, true])
      // )
    },
    getCoreRowModel: getCoreRowModel(),
    // onRowSelectionChange: () => { },
    onRowSelectionChange: setSelectedRows,
    getRowId: (row) => row.id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    pageCount: totalPage,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true
  });

  const fetchData = async ({
    pageIndex = 0,
    pageLimit = pagination.pageLimit
  }) => {
    const result = await FilterData({
      uri,
      setLoading,
      paginationModel: {
        pageIndex: pageIndex + 1,
        pageLimit: pageLimit
      },
      filterParams
    });
    setManipulatedData(result);
    setPresentedData(result?.data);
  };

  const refetchData = (newPageIndex) => {
    table.setPageIndex(newPageIndex);
    fetchData({ pageIndex: newPageIndex });
  };

  const paginationButtons = [
    {
      icon: "flowbite:chevron-double-left-outline",
      onClick: () => refetchData(0),
      disabled: !table.getCanPreviousPage()
    },
    {
      icon: "flowbite:angle-left-outline",
      onClick: () => refetchData(table.getState().pagination.pageIndex - 1),
      disabled: !table.getCanPreviousPage()
    },
    {
      icon: "flowbite:angle-right-outline",
      onClick: () => refetchData(table.getState().pagination.pageIndex + 1),
      disabled: !table.getCanNextPage()
    },
    {
      icon: "flowbite:chevron-double-right-outline",
      onClick: () => refetchData(totalPage - 1),
      disabled: !table.getCanNextPage()
    }
  ];

  useEffect(() => {
    setManipulatedData(data);
    setPresentedData(data?.data);
  }, [data]);

  return (
    <div className="w-full">
      {/* Filter + Column Toggle */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          refetchData(0);
        }}
        className="flex items-center justify-between"
      >
        {filterComponent?.startAdornment}
        {filterComponent?.endAdornment}
      </form>

      {/* Table */}
      <div className="relative w-full">
        {!!loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-md">
            <LoadingCircle color="--color-primary" thickness={4} />
          </div>
        )}
        <div className="rounded-[8px] border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} style={{ width: `${header.getSize()}px` }}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="h-14" style={{ width: `${cell.column.getSize()}px` }}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer: Info + Pagination */}
      <div className="flex items-center justify-end space-x-8 py-4">
        <div
          className={cn(
            "text-muted-foreground flex-1 text-sm",
            withoutRowsSelected ? "hidden" : ""
          )}
        >
          {Object.values(table.getState().rowSelection).length} of {totalData}{" "}
          row(s) selected.
        </div>

        {/* <div
          className={cn(
            "text-muted-foreground text-sm flex items-center gap-x-2 mr-8",
            withoutRowsFilter ? "hidden" : ""
          )}
        >
          <span>Rows per page</span>
          <Select
            value={String(table.getState().pagination.pageLimit)}
            onValueChange={(val) => {
              const newSize = Number(val);
              table.setPageIndex(newSize);
              setPagination({ pageIndex: 0, pageLimit: newSize });
              fetchData({ pageIndex: 0, pageLimit: newSize });
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

        <div
          className={cn(
            "flex items-center gap-x-2",
            withoutPagination ? "hidden" : ""
          )}
        >
          {/* <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {totalPage}
          </span>
          {paginationButtons.map(({ icon, onClick, disabled }, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              onClick={onClick}
              disabled={disabled}
            >
              <Icon icon={icon} color="black" />
            </Button>
          ))} */}
          <Button
            variant="outline"
            size="sm"
            // onClick={onClick}
            // disabled={disabled}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            // onClick={onClick}
            // disabled={disabled}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
