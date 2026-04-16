import FaqPage from "@/views/faq/components/(pages)/faqPage";

export default function PagesFaq() {
  const dummyData = {
    totalData: 3,
    data: [
      {
        id: 1,
        question:
          "Mengapa saya tidak bisa browsing pada beberapa website tertentu ?",
        answer:
          "Penyebab utama Link ke website lokal atau internasional dan situs yang dituju sedang mengalami gangguan. (Problem bukan dari koneksi internet)",
        isActive: true,
      },
      {
        id: 2,
        question:
          "Mengapa saya tidak bisa browsing pada beberapa website tertentu ?",
        answer:
          "Penyebab utama Link ke website lokal atau internasional dan situs yang dituju sedang mengalami gangguan. (Problem bukan dari koneksi internet)",
        isActive: true,
      },
      {
        id: 3,
        question:
          "Mengapa saya tidak bisa browsing pada beberapa website tertentu ?",
        answer:
          "Penyebab utama Link ke website lokal atau internasional dan situs yang dituju sedang mengalami gangguan. (Problem bukan dari koneksi internet)",
        isActive: true,
      },
    ],
  };
  return <FaqPage faqData={dummyData} />;
}
