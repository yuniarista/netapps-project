"use client";

import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { FormLabel } from "../ui/form";

export default function InputFileForm({
  name,
  control,
  label,
  accept = ".pdf, .doc, .docx, image/*",
  helperText,
  required = false,
  disabled = false,
  error,
}) {
  const [fileName, setFileName] = useState("No file chosen");
  const fileInputRef = useRef(null);

  const handleFileSelect = (e, onChange) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      onChange(selectedFile);
    }
  };

  const handleRemove = (e, onChange) => {
    e.stopPropagation();
    setFileName("No file chosen");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange(null);
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
    {label && <FormLabel>{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col gap-1.5">
            <div
              onClick={() => !disabled && fileInputRef.current?.click()}
              className={cn(
                "flex items-center gap-3 px-3 py-2 border rounded-[8px] bg-white transition-all cursor-pointer",
                error
                  ? "border-red-500"
                  : "border-slate-200 shadow-sm hover:border-slate-300",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <span className="text-[#2563eb] text-[14px] font-medium hover:underline shrink-0">
                {value ? "Change file" : "Choose file"}
              </span>

              <span className="text-[14px] truncate flex-1">
                {value ? value.name : fileName}
              </span>

              {value && (
                <button
                  type="button"
                  onClick={(e) => handleRemove(e, onChange)}
                  className="p-1 hover:bg-slate-100 rounded-full text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <input
                id={name}
                type="file"
                accept={accept}
                ref={fileInputRef}
                className="hidden"
                disabled={disabled}
                onChange={(e) => handleFileSelect(e, onChange)}
              />
            </div>

            {helperText && !error && (
              <p className="text-[13px] text-slate-400 font-normal">
                {helperText}
              </p>
            )}

            {error && (
              <p className="text-[13px] text-red-600 font-medium mt-0.5">
                {error}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}
