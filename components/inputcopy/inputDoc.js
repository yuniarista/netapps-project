"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InputDocument({
  label = "Upload Document",
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
  helperText = "",
  required = false,
  onFileChange
}) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange?.(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      onFileChange?.(droppedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
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
              Drag and Drop document here
            </p>
            <p className="text-sm font-sans font-normal">
              *Files supported .pdf .docx .xlsx .pptx
            </p>
          </>
        )}

        {file && (
          <div className="flex justify-start items-center px-2">
            <FileText className="mr-2 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground max-w-[90%] truncate">
              {file.name}
            </p>
            <Button
              type="button"
              variant="ghost"
              className="absolute -top-1 -right-3 bg-transparent hover:bg-transparent hover:text-gray-400"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <X className="w-4 h-4 text-black" />
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
