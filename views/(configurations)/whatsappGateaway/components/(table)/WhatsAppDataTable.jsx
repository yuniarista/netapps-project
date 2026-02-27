"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import PageHeader from "@/components/pageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PanelRight, Plus, Search, Settings2, X } from "lucide-react";

export default function WhatsAppDataTable({ columns, handleModalOpen }) {
  const dummyWhatsAppData = [
    {
      id: "1",
      name: "Invoice Created",
      description: "Sent when a new invoice is generated.",
      message: "Halo {name} 👋\n\nTagihan internet Anda untuk periode {period} telah tersedia.\n\n🧾 No Invoice: {invoice}\n💰 Jumlah Tagihan: Rp {nominal}\n📅 Jatuh Tempo: {duedate}\n\nSilakan lakukan pembayaran sebelum tanggal jatuh tempo melalui website kami:\n{link}\n\nTerima kasih.",
      status: "Active",
    },
    {
      id: "2",
      name: "Payment Success",
      description: "Sent after a successful payment.",
      message: "Terima kasih {name}!\n\nPembayaran untuk invoice {invoice} sebesar Rp {nominal} telah kami terima pada {period}.\n\nStatus layanan Anda kini aktif. Selamat menikmati kembali layanan internet dari {companyname}.",
      status: "Active",
    },
    {
      id: "3",
      name: "Payment Reminder",
      description: "Sent before the invoice due date.",
      message: "Halo {name}, 👋\n\nSekadar mengingatkan bahwa tagihan internet periode {period} akan jatuh tempo pada {duedate}.\n\nMohon segera lakukan pembayaran agar layanan tidak terganggu. Abaikan pesan ini jika sudah membayar. 😊",
      status: "Active",
    },
    {
      id: "4",
      name: "Due Date Alert",
      description: "Sent on the invoice due date.",
      message: "PENTING: Halo {name}, hari ini adalah batas akhir pembayaran tagihan {invoice}.\n\nHindari isolasi layanan dengan segera melunasi tagihan Anda sebesar Rp {nominal} hari ini.\n\nKlik link berikut untuk bayar: {link}",
      status: "Active",
    },
    {
      id: "5",
      name: "Service Isolation",
      description: "Sent when service is suspended due to unpaid bills.",
      message: "Mohon maaf {name}, layanan internet Anda sementara kami isolasi karena tagihan periode {period} belum terlunasi.\n\nSegera lakukan pembayaran dan konfirmasi agar teknisi kami dapat membuka kembali akses internet Anda. Terima kasih.",
      status: "Active",
    },
    {
      id: "6",
      name: "Promotional Message",
      description: "Used for marketing and campaign broadcasts.",
      message: "Promo Spesial {month}! 🚀\n\nUpgrade kecepatan internet Anda ke 50Mbps hanya dengan menambah Rp 50.000/bulan.\n\nNikmati streaming tanpa buffering untuk seluruh keluarga. Promo terbatas! Hubungi kami sekarang.",
      status: "Inactive",
    },
    {
      id: "7",
      name: "Technical Notice",
      description: "Sent for maintenance or service updates.",
      message: "Info Pemeliharaan Jaringan 🛠️\n\nHalo {name}, kami akan melakukan peningkatan kapasitas jaringan pada {duedate} pukul 01:00 - 04:00 WIB.\n\nAkan terjadi gangguan layanan singkat selama durasi tersebut. Mohon maaf atas ketidaknyamanannya.",
      status: "Inactive",
    },
  ];

  const hasData = dummyWhatsAppData.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      {hasData ? (
        <>
          <div className="p-4 space-y-4">
            <div className="w-full">
              <Label className="font-semibold text-md">Message Templates</Label>
            </div>

            <div className="flex items-center justify-between w-full gap-4 pt-0">
              <div className="relative w-full max-w-xs">
                <Input
                  placeholder="Search"
                  className="pr-10"
                // value={nameFilter}
                // onChange={(e) => setNameFilter(e.target.value)}
                />
                <Search
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <DataTableComponent
                columns={columns}
                data={{
                  data: dummyWhatsAppData,
                  totalData: dummyWhatsAppData.length
                }}
                pagination={false}
                withoutPagination={true}
                withoutRowsSelected={true}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex  flex-col items-center justify-center text-center p-6">
          <div className="space-y-4 max-w-sm">
            <h2 className="text-xl font-semibold text-slate-900">No Invoice Template</h2>
            <p className="text-slate-500 max-w-sm">
              You haven't created any invoice template yet. <br />
              Go ahead and create your first one.
            </p>
            <CustomButton
              variant="primary"
              size="lg"
              onClick={() => handleModalOpen("add")}
              className="mt-4"
            >
              <Plus className="w-4 h-4" />
              Create invoice template
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
