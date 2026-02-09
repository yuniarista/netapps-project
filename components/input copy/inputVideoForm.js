"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";

export default function InputVideoForm({
  name,
  control,
  label = "Upload Video",
  accept = "video/*",
  helperText = "",
  required = false,
  preview = true,
  showLabel = true,
  layout = "vertical", // "horizontal" or "vertical"
  variant = "default", // "default" or "destructive"
  disabled = false,
  readOnly = false,
  onFileChange,
  error
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const isDestructive = variant === "destructive" || !!error;
  const isHorizontal = layout === "horizontal";

  // cleanup URL preview
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileSelect = (e, onChange) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      setFile(selectedFile);
      if (preview && selectedFile.type.startsWith("video/")) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } else {
        setPreviewUrl(null);
      }

      onChange(selectedFile);
      onFileChange?.(selectedFile);
    }
  };

  const handleDrop = (e, onChange) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      setFile(droppedFile);
      if (preview && droppedFile.type.startsWith("video/")) {
        setPreviewUrl(URL.createObjectURL(droppedFile));
      } else {
        setPreviewUrl(null);
      }

      onChange(droppedFile);
      onFileChange?.(droppedFile);
    }
  };

  const handleRemove = (onChange) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    onChange(null);
    onFileChange?.(null);
  };

  const renderContent = (onChange, value) => (
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
          "hover:bg-muted/50 min-h-[170px] flex justify-center items-center",
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
            <p className="text-sm text-[#64748b]">Drag and Drop video here</p>
            <p className="text-sm font-sans font-normal">
              *Files supported .mp4 .mov .avi
            </p>
          </div>
        )}

        {file && (
          <div className="relative w-56 flex justify-center items-center">
            {previewUrl ? (
              <video
                src={previewUrl}
                autoPlay
                muted
                className="mx-auto max-h-48 object-contain rounded-md"
              />
            ) : (
              <p className="text-sm text-center font-medium text-foreground truncate">
                {file.name}
              </p>
            )}
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
          render={({ field: { onChange, value } }) =>
            renderContent(onChange, value)
          }
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
      {renderContent(() => {}, null)}
    </div>
  );
}
