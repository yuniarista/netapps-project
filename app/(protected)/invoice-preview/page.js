"use client";

import InvoicePreview from "@/views/(configurations)/documentTemplate/components/(components)/invoicePreview";
import { useSearchParams } from "next/navigation";

export default function InvoicePreviewPage() {
  const searchParams = useSearchParams();

  const data = {
    invoiceNo: searchParams.get("invoiceNo"),
    ispName: searchParams.get("ispName"),
    description: searchParams.get("description"),
  };

  return <InvoicePreview data={data} />;
}