import React from 'react';
import Card from "../../components/ui/Card";

export default function Transaction() {
  return (
    <>
      {/* Header Transaksi */}
      <div className="flex items-center gap-2 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-slate-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-slate-800">Transactions</h1>
      </div>

      <Card className="mb-6 min-h-[300px] flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">Area untuk Daftar Transaksi Utama</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Area Kiri Bawah */}
        <Card className="min-h-[200px] flex items-center justify-center bg-slate-100">
          <p className="text-slate-500">Area untuk Detail Transaksi / Filter</p>
        </Card>

        {/* Area Kanan Bawah */}
        <Card className="min-h-[200px] flex items-center justify-center bg-slate-100">
          <p className="text-slate-500">Area untuk Ringkasan / Statistik Transaksi</p>
        </Card>
      </div>
    </>
  );
}
