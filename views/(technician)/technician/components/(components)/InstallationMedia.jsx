"use client";

import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import InputImageForm from "@/components/input/inputImageForm";
import { FileProgressCard } from "@/components/card/fileProgressCard";
import InputMediaForm from "@/components/input/inputMediaForm";

export default function InstallationMedia() {
  const [uploads, setUploads] = useState({
    installation_photos: [],
    baa_documents: [],
  });

  const [inputKeys, setInputKeys] = useState({
    installation_photo: Date.now(),
    baa_document: Date.now() + 1,
  });

  const handleUpload = (category, file) => {
    if (!file) return;

    const fileId = Math.random().toString(36).substring(7);
    const newFile = { id: fileId, name: file.name, size: file.size, progress: 0 };

    setUploads((prev) => ({
      ...prev,
      [category]: [...prev[category], newFile],
    }));

    // Reset input form
    const inputKeyName = category === "installation_photos" ? "installation_photo" : "baa_document";
    setInputKeys((prev) => ({ ...prev, [inputKeyName]: Date.now() }));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 30);
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploads((prev) => ({
        ...prev,
        [category]: prev[category].map((f) =>
          f.id === fileId ? { ...f, progress } : f
        ),
      }));
    }, 400);
  };

  const removeFile = (category, id) => {
    setUploads((prev) => ({
      ...prev,
      [category]: prev[category].filter((f) => f.id !== id),
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-muted/40 border rounded-sm p-4 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-foreground">Installation Photos</h3>
            <p className="text-sm text-muted-foreground">
              {uploads.installation_photos.length} Uploaded
            </p>
          </div>
          <Separator />

          <InputImageForm
            key={inputKeys.installation_photo}
            name="installation_photo"
            showLabel={false}
            onFileChange={(file) => handleUpload("installation_photos", file)}
            accept="image/*"
          />

          <div className="space-y-2">
            {uploads.installation_photos.map((file) => (
              <FileProgressCard
                key={file.id}
                file={file}
                onRemove={() => removeFile("installation_photos", file.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-muted/40 border rounded-sm p-4 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-foreground">BAA Document</h3>
            <p className="text-sm text-muted-foreground">
              {uploads.baa_documents.length} Uploaded
            </p>
          </div>
          <Separator />

          <div className="space-y-4">
            <InputMediaForm
              key={inputKeys.baa_document}
              showLabel={false}
              onFileChange={(file) => handleUpload("baa_documents", file)}
              accept=".pdf,image/*"
            />

            <div className="space-y-2">
              {uploads.baa_documents.map((file) => (
                <FileProgressCard
                  key={file.id}
                  file={file}
                  onRemove={() => removeFile("baa_documents", file.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}