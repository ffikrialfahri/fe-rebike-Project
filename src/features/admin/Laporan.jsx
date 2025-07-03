import React from 'react';
import Card from "../../components/ui/Card"; // Asumsi komponen Card tersedia

export default function Laporan() {
  return (
    <>
      {/* Header Laporan & Keuangan */}
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
        <h1 className="text-3xl font-bold text-slate-800">Riport & Finance</h1>
      </div>

      {/* Kontainer untuk Bagian Atas (Empat Kotak Kecil) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Kotak 1 */}
        <Card className="min-h-[100px] flex items-center justify-center bg-slate-100">
          <p className="text-slate-500">Kotak 1</p>
        </Card>
        {/* Kotak 2 */}
        <Card className="min-h-[100px] flex items-center justify-center bg-slate-100">
          <p className="text-slate-500">Kotak 2</p>
        </Card>
        {/* Kotak 3 */}
        <Card className="min-h-[100px] flex items-center justify-center bg-slate-100">
          <p className="text-slate-500">Kotak 3</p>
        </Card>
        {/* Kotak 4 */}
        <Card className="min-h-[100px] flex items-center justify-center bg-slate-100">
          <p className="text-slate-500">Kotak 4</p>
        </Card>
      </div>

      {/* Kontainer untuk Bagian Bawah (Area Besar) */}
      <Card className="min-h-[400px] flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">Area untuk Laporan Detail</p>
      </Card>
    </>
  );
}
