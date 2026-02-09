"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, X, FileText } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";

// Optional: custom audio player kalau kamu punya
import AudioPlayer from "@/views/(medias)/audios/components/(component)/AudioPlayer";

export default function InputMediaForm({
  name,
  control,
  label = "Upload Media",
  accept = "*/*",
  helperText = "",
  required = false,
  preview = true,
  showLabel = true,
  layout = "vertical",
  variant = "default",
  disabled = false,
  readOnly = false,
  onFileChange,
  error,
  maxFileSize = 500 * 1024 * 1024
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const isDestructive = variant === "destructive" || !!error;
  const isHorizontal = layout === "horizontal";

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileSelect = (e, onChange) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleNewFile(selectedFile, onChange);
  };

  const handleDrop = (e, onChange) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleNewFile(droppedFile, onChange);
  };

  const handleNewFile = (newFile, onChange) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setFile(newFile);
    if (preview) {
      if (
        newFile.type.startsWith("image/") ||
        newFile.type.startsWith("video/") ||
        newFile.type.startsWith("audio/")
      ) {
        setPreviewUrl(URL.createObjectURL(newFile));
      } else {
        setPreviewUrl(null);
      }
    }
    onChange(newFile);
    onFileChange?.(newFile);
  };

  const handleRemove = (onChange) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange(null);
    onFileChange?.(null);
  };

  const renderPreview = () => {
    if (!file) return null;

    if (file.type.startsWith("image/") && previewUrl) {
      return (
        <div className="relative w-52 aspect-square flex justify-center items-center bg-primary/10 rounded-xs">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-contain rounded-md"
          />
        </div>
      );
    }

    if (file.type.startsWith("video/") && previewUrl) {
      return (
        <div className="relative w-96 flex justify-center items-center">
          <video
            src={previewUrl}
            autoPlay
            muted
            controls
            className="mx-auto max-h-60 object-contain rounded-md"
          />
        </div>
      );
    }

    if (file.type.startsWith("audio/") && previewUrl) {
      return (
        <div className="relative flex flex-col items-center justify-center w-fit space-y-2">
          <div className="border border-primary rounded-full">
            <AudioPlayer src={previewUrl} />
          </div>
        </div>
      );
    }

    // fallback document / unknown
    return (
      <div className="flex items-center gap-2 px-2 py-2 rounded border border-primary bg-muted w-full">
        <FileText className="w-5 h-5 text-muted-foreground" />
        <span className="truncate text-base">{file.name}</span>
      </div>
    );
  };

  const renderContent = (onChange) => (
    <>
      {showLabel && (
        <Label
          htmlFor={name}
          className={cn(
            "text-sm font-medium",
            isDestructive ? "text-red-600" : "text-slate-500"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {helperText && (
        <p
          className={cn(
            "text-sm mt-1",
            isDestructive ? "text-red-600" : "text-slate-500"
          )}
        >
          {helperText}
        </p>
      )}

      <div
        className={cn(
          "relative border-2 border-dashed rounded-md px-2 py-4 text-center cursor-pointer transition w-full",
          "hover:bg-muted/50 min-h-[270px] flex justify-center items-center",
          dragActive && "border-violet-500 bg-violet-50",
          isDestructive ? "border-red-500" : "border-[#9C6ADE]",
          disabled && "opacity-50 pointer-events-none"
        )}
        onClick={() => !readOnly && !disabled && fileInputRef.current?.click()}
        onDrop={(e) => handleDrop(e, onChange)}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
      >
        {!file && (
          <div className="flex flex-col justify-center items-center space-y-2">
            <Upload className="mx-auto h-6 w-6 text-[#9ca3af]" />
            <Button
              type="button"
              className="rounded-md bg-violet-600 text-white px-4 py-1 hover:bg-violet-700"
              disabled={disabled}
            >
              Browse
            </Button>
            <p className="text-sm text-[#64748b]">Drag and Drop file here</p>
          </div>
        )}

        {file && (
          <div>
            {renderPreview()}
            {!readOnly && !disabled && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute -top-2 -right-2 p-0.5 bg-red-100 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(onChange);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}

        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          ref={fileInputRef}
          required={required}
          disabled={disabled}
          className="hidden"
          onChange={(e) => handleFileSelect(e, onChange)}
        />
      </div>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </>
  );

  if (control) {
    return (
      <div
        className={cn(
          "w-full",
          isHorizontal ? "flex items-center gap-4" : "flex flex-col gap-1"
        )}
      >
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => renderContent(onChange)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full",
        isHorizontal ? "flex items-center gap-4" : "flex flex-col gap-1"
      )}
    >
      {renderContent(() => {})}
    </div>
  );
}
