"use client";

import Image from "next/image";
import IconifyIcon from "@/components/icon";
import InputDuration from "../input/inputDuration";
import { useEffect, useState } from "react";
import CustomButtonIcon from "../button/customButtonIcon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import SelectInputUncontrolled from "../input/selectInputUncontrolled";
import MediaItemCard from "./mediaItemCard";
import validatedNumber from "@/utils/isNanValidator";

export default function SortableCardList({
  data,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  onDrop,
  onDelete,
  transitionOptions,
  setPlaylistData,
  isAllMediaUseSameTransition,
  error
}) {
  const [playlistItemError, setPlaylistItemError] = useState(false);
  const [transitionSpeedSelected, setTransitionSpeedSelected] = useState();
  const manipulatedTransitionSpeedData =
    transitionOptions?.transitionSpeedData?.filter((prev) => {
      return prev?.value !== "None";
    });

  useEffect(() => {
    setPlaylistItemError(error?.playlistsItem?.[0]);
  }, [error]);

  useEffect(() => {
    if (data?.length > 0) {
      setPlaylistItemError(false);
    }
  }, [data]);
  return (
    <div
      className={cn(`w-full flex-1 min-h-56 rounded-md`)}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {!!playlistItemError && (
        <div className="w-full h-full flex flex-col items-center gap-y-4 justify-center rounded-lg border border-red-600 bg-red-50 border-dashed">
          <IconifyIcon
            icon={"solar:danger-triangle-broken"}
            size="48"
            className="text-red-600"
          />
          <span className="w-1/2 text-center text-lg font-semibold text-red-600">
            {playlistItemError}
          </span>
        </div>
      )}
      {(data?.length === 0 || !data) && !playlistItemError && (
        <div className="w-full h-full flex flex-col items-center gap-y-4 justify-center rounded-lg border border-primary bg-primary/10 border-dashed">
          <IconifyIcon
            icon={"solar:playlist-bold"}
            size="48"
            className="text-primary"
          />
          <span className="w-1/2 text-center text-lg font-semibold text-primary">
            Put your media here!
          </span>
        </div>
      )}
      {data?.map((item, index) => {
        const isLast = data?.length - 1 === index;
        const formatFileName = (fileName) => {
          const formattedFileName = fileName?.replace(/^\d+-/, "");
          return formattedFileName;
        };

        const duration = validatedNumber(item?.duration);
        const pages = Math.max(1, validatedNumber(item?.pageTotal));
        const durationTotal = duration * pages;

        const getTransitionSpeed = (transitionTypeSelected) => {
          return transitionTypeSelected === "None"
            ? [...manipulatedTransitionSpeedData, { value: "None" }]
            : manipulatedTransitionSpeedData;
        };

        return (
          <div
            key={index}
            data-index={index}
            className={`flex items-center justify-between gap-2 w-full px-4 py-2.5 bg-background hover:cursor-grab ${
              isLast ? "border-none" : "border-b border-secondary"
            }`}
            onDragEnter={() => onDragEnter(index)}
          >
            {/* Drag Handle */}
            <div
              draggable
              onDragStart={(e) => {
                const card = e.currentTarget.closest("[data-index]");
                const idx = parseInt(card.getAttribute("data-index"));
                onDragStart(idx, "internal");

                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setDragImage(card, 0, 0);
              }}
              onDragEnd={onDragEnd}
              className="w-8 h-8 flex items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <IconifyIcon icon="system-uicons:drag" />
            </div>
            {/* Content */}
            <div className="flex flex-1 items-center gap-2">
              <MediaItemCard data={data} item={item} key={index} />
              <div className="flex flex-col gap-1">
                <p className="text-[12px] font-medium text-foreground">
                  {formatFileName(item?.path)}
                </p>
                <span className="text-[10px] font-normal text-muted-foreground">
                  {item?.size} KB
                </span>
              </div>
            </div>

            {/* Delete Button */}
            <div className="flex items-center justify-end gap-x-2">
              <Popover>
                <PopoverTrigger
                  className="rounded-sm text-muted-foreground p-2 border-[1px] border-gray-300 flex items-center justify-center gap-x-2 text-sm"
                  disabled={isAllMediaUseSameTransition}
                  aria-disabled={isAllMediaUseSameTransition}
                >
                  <IconifyIcon
                    icon={"material-symbols:transition-push-outline"}
                    size="1rem"
                  />
                  {item?.transitionType ?? "None"}
                </PopoverTrigger>
                <PopoverContent
                  className="border-none shadow-xl w-72"
                  avoidCollisions={true}
                  collisionsPadding={8}
                  sideOffset={4}
                >
                  <div className="grid grid-cols-2 gap-2 p-2">
                    {transitionOptions?.transitionTypeData?.map((option, k) => {
                      return (
                        <div key={k}>
                          <Button
                            key={option.id || option.value}
                            value={(option.value ?? "None")?.toString()}
                            variant="ghost"
                            className={cn(
                              "h-auto p-1 cursor-pointer hover:bg-slate-100 rounded-sm",
                              option.value === item?.transitionType &&
                                "outline outline-primary"
                            )}
                            onClick={(e) => {
                              e.preventDefault();
                              setPlaylistData((prev) => {
                                return prev.map((item, i) =>
                                  i === index
                                    ? {
                                        ...item,
                                        transitionType: option?.value,
                                        transitionSpeed:
                                          option?.value === "None"
                                            ? "None"
                                            : "Normal"
                                      }
                                    : item
                                );
                              });
                            }}
                          >
                            <div className="w-full flex-col justify-center items-center gap-3">
                              {/* Transition Name */}
                              <div className="flex-1 w-full">
                                <div className="font-medium text-sm truncate text-center">
                                  {option.value ||
                                    option.transitionName ||
                                    option.name ||
                                    option.label}
                                </div>
                              </div>

                              {option.image ? (
                                <div className="relative h-20 w-28 overflow-hidden rounded self-stretch min-w-0">
                                  <Image
                                    src={option.image} // "/transition-type/None.png" dsb.
                                    alt={
                                      option.transitionName ||
                                      option.name ||
                                      "Transition"
                                    }
                                    fill
                                    className="object-cover block" // pakai block, jangan tambah w-full/h-full saat fill
                                    sizes="100vw"
                                  />
                                </div>
                              ) : (
                                <div className="relative h-20 w-28 overflow-hidden rounded">
                                  <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls={false}
                                    className="w-full h-24 object-cover rounded"
                                  >
                                    {/* Gunakan <source> + type untuk bantu browser memilih decoder */}
                                    <source
                                      src={option.video}
                                      type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                              )}

                              {/* Optional color swatch */}
                              {option.color && (
                                <div
                                  className="w-4 h-4 rounded-full flex-shrink-0 border border-border"
                                  style={{
                                    backgroundColor: option.color
                                  }}
                                />
                              )}
                            </div>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-start gap-x-2">
                    <span className="text-sm w-full">Transition Speed : </span>
                    <SelectInputUncontrolled
                      name="transitionSpeed"
                      selectedValue={item?.transitionSpeed}
                      setSelectedValue={setTransitionSpeedSelected}
                      handleCustomChange={(value) => {
                        setPlaylistData((prev) => {
                          return prev.map((item, i) =>
                            i === index
                              ? { ...item, transitionSpeed: value }
                              : item
                          );
                        });
                      }}
                      disabled={item?.transitionType === "None"}
                      placeholder="-"
                      options={getTransitionSpeed(item?.transitionType)}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <InputDuration
                key={`duration-${item?.id ?? index}`}
                name="duration"
                label="Duration"
                value={item.type === "Documents" ? duration : durationTotal}
                onChange={(total) => {
                  setPlaylistData((prev) =>
                    prev.map((it, i) => {
                      if (i !== index) return it;
                      const pages = Math.max(1, Number(it?.pageTotal) || 1);
                      const nextPerPage = Math.max(
                        0,
                        it.type === "Documents"
                          ? Math.round(total)
                          : Math.round(total / pages)
                      );
                      // Compare against current *total* to avoid false "no change"
                      const currentTotal = (it.duration ?? 0) * pages;
                      if (total === currentTotal && nextPerPage === it.duration)
                        return it;

                      return { ...it, duration: nextPerPage };
                    })
                  );
                }}
                disabled={item?.type === "Documents"}
                helperText={error?.[`playlistsItem.${index}`]?.duration?.[0]}
                variant={
                  !!error?.[`playlistsItem.${index}`]?.duration?.[0]
                    ? "destructive"
                    : "default"
                }
              />
              <CustomButtonIcon variant="ghost" onClick={() => onDelete(index)}>
                <IconifyIcon icon="ic:outline-delete" size="1rem" />
              </CustomButtonIcon>
            </div>
          </div>
        );
      })}
    </div>
  );
}
