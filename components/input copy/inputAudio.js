"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InputAudio({
  label = "Upload Audio",
  accept = "audio/*",
  helperText = "",
  preview = true,
  required = false,
  onFileChange
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (preview && selectedFile.type.startsWith("audio/")) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } else {
        setPreviewUrl(null);
      }
      onFileChange?.(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      if (preview && droppedFile.type.startsWith("audio/")) {
        setPreviewUrl(URL.createObjectURL(droppedFile));
      } else {
        setPreviewUrl(null);
      }
      onFileChange?.(droppedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    fileInputRef.current.value = null;
    onFileChange?.(null);
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="font-medium text-sm">{label}</label>}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-md px-2 py-4 text-center cursor-pointer transition",
          "hover:bg-muted/50 border-[#9C6ADE]",
          !file && "min-h-[170px]"
        )}
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {!file && (
          <>
            <Upload className="mx-auto h-6 w-6 text-[#9ca3af]" />
            <Button
              type="button"
              className="mt-2 rounded-md bg-violet-600 text-white px-4 py-1"
            >
              Browse
            </Button>
            <p className="text-sm text-[#64748b] my-2">
              Drag and Drop audio file here
            </p>
            <p className="text-sm font-sans font-normal">
              *Files supported .mp3 .wav .ogg
            </p>
          </>
        )}

        {file && (
          <div className="flex justify-center items-center">
            {previewUrl ? (
              <audio src={previewUrl} controls className="mx-auto w-full" />
            ) : (
              <p className=" text-sm text-center font-medium text-foreground max-w-[90%] truncate">
                {file.name}
              </p>
            )}
            <Button
              type="button"
              variant="ghost"
              className="absolute -top-1 -right-3 bg-transparent hover:bg-transparent hover:text-gray-400"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <X className="w-4 h-4  text-black" />
            </Button>
          </div>
        )}

        <input
          type="file"
          accept={accept}
          ref={fileInputRef}
          required={required}
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {helperText && <p className="text-[13px] text-slate-500">{helperText}</p>}
    </div>
  );
}
