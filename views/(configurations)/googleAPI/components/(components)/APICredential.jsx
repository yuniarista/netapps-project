"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Eye, EyeOff, Copy, Check } from "lucide-react";

const APICredential = ({ onEdit, data }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const apiKey = data?.apiKey || "";

  // Function untuk hide/show API key
  const getMaskedKey = () => {
    if (!apiKey) return "";
    if (isRevealed) return apiKey;

    // Tampilkan 6 karakter pertama dan 4 karakter terakhir, sisanya jadi titik
    const start = apiKey.slice(0, 6);
    const end = apiKey.slice(-4);
    const dots = "•".repeat(Math.max(0, apiKey.length - 10));

    return `${start}${dots}${end}`;
  };

  // Function untuk copy ke clipboard
  const handleCopy = () => {
  if (!apiKey) return;

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(apiKey).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  } else {
    // Fallback untuk HTTP / akses via IP
    const textarea = document.createElement("textarea");
    textarea.value = apiKey;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Gagal copy:", err);
    } finally {
      document.body.removeChild(textarea);
    }
  }
};

  const displayValue = getMaskedKey();

  return (
    <div className="w-full">
      <Card className="shadow-sm border-slate-200 bg-white">
        {/* Header */}
        <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-slate-900">
              API Credential
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Manage Google API Data
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-slate-100"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4 text-slate-400" />
          </Button>
        </CardHeader>

        {/* Content */}
        <div className="px-4 pb-4 space-y-4">
          {/* Input API Key */}
          <Input
            type="text"
            value={displayValue}
            disabled
            className="bg-slate-100 text-slate-700 border-slate-200"
            placeholder="No API Key configured"
          />

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* Reveal/Hide Button */}
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setIsRevealed(!isRevealed)}
            >
              {isRevealed ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Reveal
                </>
              )}
            </Button>

            {/* Copy Button */}
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleCopy}
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Key
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default APICredential;
