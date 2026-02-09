"use client";

import Image from "next/image";
import { FileText, Music, Video, File } from "lucide-react"; // You can use any icon library
import LazyLoadVideo from "@/views/(medias)/videos/components/(component)/LazyLoadVideo";
import { useState } from "react";
import IconifyIcon from "../icon";
import MediaItemCard from "./mediaItemCard";

export default function DraggableCard({ data, onDragStart }) {
  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0 || !bytes) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatFileName = (fileName) => {
    const formattedFileName = fileName?.replace(/^\d+-/, "");
    return formattedFileName;
  };

  return (
    <div
      className="flex flex-col w-full px-4 py-2.5 border-b border-gray-100 hover:cursor-grab"
      draggable
      onDragStart={onDragStart}
    >
      <div className="w-full flex items-center gap-2">
        <MediaItemCard item={data} />
        <div className="flex flex-col gap-0.5 w-2/3 truncate">
          <p className="text-[12px] font-medium text-foreground truncate">
            {formatFileName(data.path)}
          </p>
          <span className="text-[10px] font-normal text-muted-foreground">
            {formatFileSize(data.size)}
          </span>
        </div>
      </div>
    </div>
  );
}
