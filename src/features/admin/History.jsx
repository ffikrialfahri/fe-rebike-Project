import React from 'react';
import Card from "../../components/ui/Card"; // Asumsi komponen Card tersedia

export default function History() {
  return (
    <>
      {/* Header History */}
      <div className="flex items-center gap-2 mb-6">
        {/* SVG Icon untuk jam/dashboard, sesuai desain Figma */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-slate-700" // Ukuran dan warna icon
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-slate-800">History</h1>
      </div>

      {/* Kontainer untuk Area Utama History */}
      <Card className="min-h-[500px] flex items-center justify-center bg-slate-100"> {/* min-h untuk placeholder visual, bg-slate-100 untuk warna abu-abu */}
        {/* Placeholder untuk area utama history, sesuai desain Figma */}
        <p className="text-slate-500">Area untuk Riwayat Transaksi/Aktivitas</p>
      </Card>
    </>
  );
}
