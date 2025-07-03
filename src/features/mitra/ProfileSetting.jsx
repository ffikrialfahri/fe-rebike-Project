import React from 'react';
import Card from "../../components/ui/Card";

export default function ProfileSetting() {
  return (
    <>
      {/* Header Setting Account */}
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
        <h1 className="text-3xl font-bold text-slate-800">Setting Account</h1>
      </div>

      {/* Kontainer untuk Area Atas (Kecil) */}
      <Card className="mb-6 min-h-[100px] flex items-center justify-center bg-slate-100"> {/* min-h untuk placeholder visual, bg-slate-100 untuk warna abu-abu */}
        {/* Placeholder untuk area atas, sesuai desain Figma */}
        <p className="text-slate-500">Area untuk Pengaturan Umum / Info Singkat</p>
      </Card>

      {/* Kontainer untuk Area Tengah (Lebih Besar) */}
      <Card className="mb-6 min-h-[250px] flex items-center justify-center bg-slate-100"> {/* min-h untuk placeholder visual, bg-slate-100 untuk warna abu-abu */}
        {/* Placeholder untuk area tengah, sesuai desain Figma */}
        <p className="text-slate-500">Area untuk Form Edit Profil / Data Diri</p>
      </Card>

      {/* Kontainer untuk Area Bawah (Paling Besar) */}
      <Card className="min-h-[300px] flex items-center justify-center bg-slate-100"> {/* min-h untuk placeholder visual, bg-slate-100 untuk warna abu-abu */}
        {/* Placeholder untuk area bawah, sesuai desain Figma */}
        <p className="text-slate-500">Area untuk Pengaturan Keamanan / Preferensi Lain</p>
      </Card>
    </>
  );
}
