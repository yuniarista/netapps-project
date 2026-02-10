"use client";

import { useEffect, useState } from "react";
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
import useMediaImageFetcher from "@/views/(medias)/images/hooks/useMediaImageFetcher";
import CardImageModal from "@/views/schedules/components/(components)/CardImageModal";

export default function SelectImageInput({
  name,
  label,
  control,
  imgOptions = [],
  defaultValue,
  placeholder,
  disabled,
  isHidden = false,
  uri,
  errors
}) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState(imgOptions);
  const [paginationModel, setPaginationModel] = useState({
    pageIndex: 1,
    pageLimit: 30
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchImageData = useMediaImageFetcher({
    paginationModel,
    setData: setImages,
    setHasMore,
    setLoading,
    uri
  });

  useEffect(() => {
    if (paginationModel.pageIndex > 1) {
      fetchImageData({
        pageIndex: paginationModel.pageIndex,
        pageLimit: paginationModel.pageLimit,
        isLoadMore: true
      });
    }
  }, [paginationModel.pageIndex]);

  const lastElementRef = useInfiniteScroll({
    callback: () => {
      setPaginationModel((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1
      }));
    },
    hasMore,
    loading
  });

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
                    onClick={() => setOpen(true)}
                  >
                    <span className="truncate text-sm">
                      {field?.value?.path
                        ? field?.value?.path
                        : placeholder || `Select ${label}`}
                    </span>
                  </div>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        type="button"
                        disabled={disabled}
                      >
                        Change
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Pilih {label}</DialogTitle>
                      </DialogHeader>

                      <div className="w-full max-h-[500px] overflow-y-auto px-2">
                        <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
                          {images?.data?.map((item, index) => {
                            const isLast = index === images?.data?.length - 1;
                            return (
                              <div
                                key={item.id}
                                className="mb-4 break-inside-avoid cursor-pointer"
                                ref={isLast ? lastElementRef : null}
                              >
                                <CardImageModal
                                  item={item}
                                  isSelected={field.value?.id === item.id}
                                  onClick={() => {
                                    field?.onChange({
                                      id: item.id,
                                      path: item.path
                                    });
                                    setOpen(false);
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>

                        {loading && <Loading />}

                        {!hasMore && (
                          <div className="text-center text-sm py-2">
                            You’ve reached the end.
                          </div>
                        )}
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
