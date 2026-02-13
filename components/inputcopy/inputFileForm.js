"use client";

import React, { useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  FormControl, 
  FormField, // Menggunakan FormField agar konsisten dengan TextInputForm
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

export default function InputFileForm({
  name,
  control,
  label,
  accept = ".pdf, .doc, .docx, image/*",
  helperText,
  required = false,
  disabled = false,
}) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e, onChange) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
  };

  const handleRemove = (e, onChange) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange(null);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormItem className="w-full">
          {/* Label disamakan persis logikanya dengan TextInputForm */}
          {label && (
            <FormLabel className="flex items-center gap-0">
              <span>{String(label).trim()}</span>
              {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <div
              onClick={() => !disabled && fileInputRef.current?.click()}
              className={cn(
                // h-10 ditambahkan agar tinggi box sama dengan InputText standar
                "flex items-center h-9 gap-3 px-3 border rounded-[5px] bg-white transition-all cursor-pointer",
                error
                  ? "border-red-500"
                  : "border-slate-200 shadow-sm hover:border-slate-300",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <span className="text-[#2563eb] text-[14px] font-medium hover:underline shrink-0">
                {value ? "Change file" : "Choose file"}
              </span>

              <span className="text-[14px] truncate flex-1 text-slate-600">
                {value ? value.name : "No file chosen"}
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
          </FormControl>

          {/* Helper Text & Error Message */}
          {helperText && !error && (
            <p className="text-[12px] text-slate-500 mt-1">{helperText}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}