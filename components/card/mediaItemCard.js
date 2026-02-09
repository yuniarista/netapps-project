import Image from "next/image";
import IconifyIcon from "../icon";
import { useState } from "react";
import LazyLoadVideo from "@/views/(medias)/videos/components/(component)/LazyLoadVideo";
import { cn } from "@/lib/utils";

const MediaItemCard = ({ item, className, style, ...rest }) => {
  const [imageError, setImageError] = useState(false);
  const getFileType = (type) =>
    type === "Images"
      ? "image"
      : type === "Videos"
      ? "video"
      : type === "Audios"
      ? "audio"
      : type === "Documents"
      ? "document"
      : type === "Websites"
      ? "website"
      : "other";

  const fileType = getFileType(item.type);
  const baseClass = cn(
    "relative size-16 flex items-center justify-center rounded-xs bg-slate-200",
    className
  );
  switch (fileType) {
    case "image":
      return (
        <div className={baseClass} style={style} {...rest}>
          {!imageError ? (
            <Image
              src={item?.url}
              sizes="48"
              fill
              onError={() => setImageError(true)}
              alt={item?.path}
              className="object-contain rounded-xs shadow-md"
            />
          ) : (
            <div className="flex items-center justify-center">
              <IconifyIcon icon={"lucide:file-x-2"} />
            </div>
          )}
        </div>
      );

    case "document":
      return (
        <div className={baseClass} style={style} {...rest}>
          <IconifyIcon
            icon={"lucide:file-text"}
            className="w-6 h-6 text-foreground"
          />
        </div>
      );

    case "video":
      return (
        <div className={baseClass} style={style} {...rest}>
          <LazyLoadVideo
            key={item.path}
            src={item.url}
            autoPlay
            height={16}
            loop
            playsInline
            className="rounded-xs"
          />
        </div>
      );

    case "audio":
      return (
        <div className={baseClass} style={style} {...rest}>
          <IconifyIcon
            icon={"lucide:file-audio"}
            className="w-6 h-6 text-foreground"
          />
        </div>
      );

    case "website":
      return (
        <div className={baseClass} style={style} {...rest}>
          <IconifyIcon icon={"mdi:web"} className="w-6 h-6 text-foreground" />
        </div>
      );

    default:
      return (
        <div className={baseClass} style={style} {...rest}>
          <IconifyIcon
            icon={"lucide:file-x-2"}
            className="w-6 h-6 text-foreground"
          />
        </div>
      );
  }
};

export default MediaItemCard;
