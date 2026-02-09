"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import useInfiniteScroll from "@/hooks/use-infinity-scroll";
import Loading from "@/app/(protected)/loading";
import CustomButton from "../button/customButton";
import IconifyIcon from "../icon";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import CardMediaModal from "@/views/schedules/components/(components)/CardMediaModal";
import { Badge } from "../ui/badge";
import { CreateFormData, FilterData } from "@/libs/function";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import ImportMediaForm from "@/views/schedules/components/(form)/ImportMediaForm";
import useMediaFetcher from "@/views/schedules/hooks/useMediaFetcher";
import CustomAlert from "../alert/customAlert";

export default function SelectInputMedia({
  name,
  label,
  control,
  mediaOptions = [],
  defaultValue,
  placeholder,
  mediaTypeOptions,
  disabled,
  isHidden = false,
  uri,
  exlude = "",
  errors
}) {
  const [open, setOpen] = useState(false);
  const [fakeModal, setFakeModal] = useState(false);
  const [filteredMediaData, setFilteredMediaData] = useState(mediaOptions);
  const [paginationModel, setPaginationModel] = useState({
    pageIndex: 1,
    pageLimit: 100
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fileOrigin, setFileOrigin] = useState("All Media");
  const [searchFilter, setSearchFilter] = useState("");
  const [tempSearchFilter, setTempSearchFilter] = useState("");
  const [tempSelected, setTempSelected] = useState(null);
  const [mediaTypeFilterSelected, setMediaTypeFilterSelected] = useState("");
  const [res, setRes] = useState({});
  const filterParams = useMemo(
    () => [
      { key: "mediaType", value: mediaTypeFilterSelected },
      { key: "search", value: searchFilter },
      { key: "exclude", value: `${exlude}` }
    ],
    [mediaTypeFilterSelected, searchFilter]
  );
  const [alertOpen, setAlertOpen] = useState(false);
  useEffect(() => {
    // open whenever status changes (including same truthy value with new message)
    setAlertOpen(!!res?.status);
  }, [res]);

  const handleFilterMediaType = (mediaTypeSelected) => {
    setPaginationModel((prev) => ({
      ...prev,
      pageIndex: 1
    }));
    setHasMore(true);
    setMediaTypeFilterSelected(mediaTypeSelected);
  };

  const truncateFileName = (name, start = 70) => {
    if (!name) return "";
    if (name.length <= start) return name;
    return `${name.slice(0, start)}...`;
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      const response = await FilterData({
        uri: "media",
        setData: setFilteredMediaData,
        setLoading,
        filterParams,
        paginationModel
      });
      setFilteredMediaData(response ?? []);
      setLoading(false);
    };

    fetchFilteredData();
  }, [filterParams]);

  const fetchImageData = useMediaFetcher({
    paginationModel,
    setData: setFilteredMediaData,
    setHasMore,
    setLoading,
    nameFilter: searchFilter,
    exclude: exlude,
    mediaType: mediaTypeFilterSelected,
    uri
  });

  const formatFileName = (fileName) => {
    const formattedFileName = fileName?.replace(/^\d+-/, "");
    return formattedFileName;
  };

  const getMediaIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "audios":
        return <IconifyIcon icon="lucide:file-audio" />;
      case "documents":
        return <IconifyIcon icon="lucide:file" />;
      case "videos":
        return <IconifyIcon icon="lucide:video" />;
      case "images":
        return <IconifyIcon icon="lucide:image" />;
      case "websites":
        return <IconifyIcon icon="lucide:globe" />;
      default:
        return <IconifyIcon icon="lucide:file" />;
    }
  };

  const fileOriginOptions = [
    { label: "All Media", value: "All Media", icon: "lucide:folder" },
    { label: "Media File", value: "Media File", icon: "lucide:image" }
    // {
    //   label: "Stock Image",
    //   value: "Stock Image",
    //   icon: "lucide:cloud-rain-wind"
    // }
  ];

  // const folders = [
  //   { label: "All Media", id: "All Media" },
  //   { label: "Image File", id: "Image File" },
  //   {
  //     label: "Stock Image",
  //     id: "Stock Image"
  //   }
  // ];

  useEffect(() => {
    if (paginationModel.pageIndex > 1) {
      fetchImageData({
        pageIndex: paginationModel.pageIndex,
        pageLimit: paginationModel.pageLimit,
        isLoadMore: true
      });
    }
  }, [paginationModel.pageIndex]);

  const lastElementRef = useInfiniteScroll(
    () => {
      setPaginationModel((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1
      }));
    },
    hasMore,
    loading
  );

  const handleCreate = (DataForm) => {
    const formData = new FormData();
    DataForm.name = DataForm.file.name;
    if (DataForm.file.type.startsWith("image/")) {
      DataForm.type = "Images";
    } else if (DataForm.file.type.startsWith("video/")) {
      DataForm.type = "Videos";
    } else if (DataForm.file.type.startsWith("audio/")) {
      DataForm.type = "Audios";
    } else if (DataForm.file.type.startsWith("application/")) {
      DataForm.type = "Documents";
    }
    DataForm.fromUrl = "local";
    for (const item in DataForm) {
      formData.append(item, DataForm[item]);
    }
    CreateFormData({
      uri: "media",
      setData: setFilteredMediaData,
      formData,
      setLoading,
      setModal: setFakeModal,
      setResponse: setRes,
      withoutCloseModal: true,
      paginationModel,
      setPaginationModel,
      filterParams
    });
  };

  useEffect(() => {
    if (res?.status === "success" && res?.data) {
      setTempSelected(res?.data);
      setFileOrigin("All Media");
      setTimeout(() => setRes({}), 100);
    }
  }, [res]);

  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex items-center border border-gray-200 cursor-pointer hover:bg-slate-100 rounded-md px-3 py-2 flex-1 overflow-hidden",
                      errors[name] && "border-red-500"
                    )}
                    onClick={() => {
                      setTempSelected(field.value);
                      setOpen(true);
                    }}
                  >
                    <span
                      className={cn(
                        "truncate whitespace-nowrap overflow-hidden w-full text-sm",
                        field?.value ? "" : "text-gray-400"
                      )}
                    >
                      {field?.value?.path
                        ? truncateFileName(field?.value?.path)
                        : placeholder || `Select Media`}
                    </span>
                  </div>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        type="button"
                        disabled={disabled}
                        onClick={() => setTempSelected(field.value)}
                      >
                        Change
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-6xl max-h-[93%] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Insert Media</DialogTitle>
                      </DialogHeader>

                      {/* Tabs + Search */}
                      <div className="flex flex-col space-y-5">
                        {/* Tabs */}
                        <div className="flex gap-3">
                          {fileOriginOptions.map((fileOps) => (
                            <CustomButton
                              key={fileOps.value}
                              variant="outline"
                              onClick={() => setFileOrigin(fileOps.value)}
                              className={`flex flex-col max-h-20 ${
                                fileOps.value === fileOrigin
                                  ? "bg-purple-200 border border-purple-400"
                                  : "bg-[#f5f5f5]"
                              }`}
                            >
                              <IconifyIcon icon={fileOps.icon} />
                              {fileOps.label}
                            </CustomButton>
                          ))}
                        </div>
                        {/* Search */}
                        <div
                          className={cn(
                            "flex flex-col space-y-1",
                            fileOrigin === "Media File" ? "hidden" : ""
                          )}
                        >
                          <Label className="font-semibold text-base">
                            Select image from your files
                          </Label>
                          <Input
                            placeholder="Filter by name..."
                            value={tempSearchFilter}
                            onChange={(e) =>
                              setTempSearchFilter(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                setPaginationModel((prev) => ({
                                  ...prev,
                                  pageIndex: 1
                                }));
                                setHasMore(true);
                                setSearchFilter(tempSearchFilter);
                              }
                            }}
                            className="max-w-xs"
                          />
                        </div>
                      </div>

                      {fileOrigin === "Media File" ? (
                        <ImportMediaForm
                          handleCreate={handleCreate}
                          loading={loading}
                          alertOpen={alertOpen}
                          setAlertOpen={setAlertOpen}
                          response={res}
                          setResponse={setRes}
                        />
                      ) : (
                        <div className="flex gap-4 flex-1 overflow-hidden py-4">
                          {/* Sidebar */}
                          <div className="w-60 border-r pr-2 overflow-y-auto">
                            <div className="font-medium text-sm text-gray-600 mb-2">
                              Media Type
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {mediaTypeOptions?.map((opt, index) => (
                                <Badge
                                  key={index}
                                  variant={
                                    mediaTypeFilterSelected === opt?.value
                                      ? "primary"
                                      : "outlined"
                                  }
                                  className="capitalize"
                                  onClick={() => {
                                    const isSelected =
                                      mediaTypeFilterSelected === opt?.value;
                                    handleFilterMediaType(
                                      isSelected ? "" : opt?.value
                                    );
                                  }}
                                >
                                  {opt?.value || "All Media"}
                                </Badge>
                              ))}
                            </div>

                            {/* Folders */}
                            {/* <div className="space-y-1">
                            <div className="font-medium text-sm text-gray-600 mb-2">
                              Folders
                            </div>
                            <ul className="space-y-1">
                              {folders?.map((folder) => (
                                <li
                                  key={folder.id}
                                  className="cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
                                  onClick={() => setSelectedFolder(folder.id)}
                                >
                                  {folder.label}
                                </li>
                              ))}
                            </ul>
                          </div> */}
                          </div>

                          {/* Main content */}
                          <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
                            {/* Grid images */}
                            {filteredMediaData?.data?.length > 0 ? (
                              <div className="flex-1 overflow-y-auto px-2">
                                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-3">
                                  {filteredMediaData?.data?.map(
                                    (item, index) => {
                                      const isLast =
                                        index ===
                                        filteredMediaData?.data?.length - 1;
                                      return (
                                        <div
                                          key={item.id}
                                          ref={isLast ? lastElementRef : null}
                                          className="inline-block"
                                        >
                                          <Tooltip key={item.id}>
                                            <TooltipTrigger>
                                              <CardMediaModal
                                                item={item}
                                                isSelected={
                                                  tempSelected?.id === item.id
                                                }
                                                onClick={() =>
                                                  setTempSelected({
                                                    id: item.id,
                                                    path: item.path,
                                                    type: item.type
                                                  })
                                                }
                                              />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-80 flex items-center gap-x-2">
                                              {getMediaIcon(item.type)}
                                              <span className="max-w-60 break-words">
                                                {formatFileName(item.path)}
                                              </span>
                                            </TooltipContent>
                                          </Tooltip>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>

                                {loading && <Loading />}
                                {!hasMore && (
                                  <div className="text-center text-sm py-2">
                                    You&apos;ve reached the end.
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="w-full h-full flex justify-center items-center text-center text-gray-500">
                                There&apos;s no data
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div
                        className={cn(
                          "flex justify-end space-x-2 pt-3",
                          fileOrigin === "Media File" ? "hidden" : ""
                        )}
                      >
                        <CustomButton
                          variant="outline"
                          onClick={() => {
                            setTempSelected(null);
                            setOpen(false);
                          }}
                        >
                          Cancel
                        </CustomButton>
                        <CustomButton
                          onClick={() => {
                            if (tempSelected) {
                              field.onChange(tempSelected);
                            }
                            setOpen(false);
                          }}
                        >
                          Import
                        </CustomButton>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
