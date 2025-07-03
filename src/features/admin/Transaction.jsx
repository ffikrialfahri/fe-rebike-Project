import React from 'react';
import Card from "../../components/ui/Card"; // Asumsi komponen Card tersedia

export default function Transaction() {
  return (
    <>
      {/* Header Transaksi */}
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
        <h1 className="text-3xl font-bold text-slate-800">Transactions</h1>
      </div>

      {/* Kontainer untuk Bagian Atas (Area Besar) */}
      <Card className="mb-6 min-h-[300px] flex items-center justify-center bg-slate-100"> {/* min-h untuk placeholder visual, bg-slate-100 untuk warna abu-abu */}
        {/* Placeholder untuk bagian atas, sesuai desain Figma */}
        <p className="text-slate-500">Area untuk Daftar Transaksi Utama</p>
      </Card>

      {/* Kontainer untuk Bagian Bawah (Dua Area Kecil Berdampingan) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Area Kiri Bawah */}
        <Card className="min-h-[200px] flex items-center justify-center bg-slate-100"> {/* min-h untuk placeholder visual, bg-slate-100 untuk warna abu-abu */}
          <p className="text-slate-500">Area untuk Detail Transaksi / Filter</p>
        </Card>

        {/* Area Kanan Bawah */}
        <Card className="min-h-[200px] flex items-center justify-center bg-slate-100"> {/* min-h untuk placeholder visual, bg-slate-100 untuk warna abu-abu */}
          <p className="text-slate-500">Area untuk Ringkasan / Statistik Transaksi</p>
        </Card>
      </div>
    </>
  );
}
