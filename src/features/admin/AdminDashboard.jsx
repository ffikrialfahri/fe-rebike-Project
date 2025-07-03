import StatCard from "../../components/ui/StatCard";
import ChartComponent from "../../components/ui/ChartComponent";
import Card from "../../components/ui/Card";
import { adminChartData, chartOptions } from "../../lib/chart-config";

export default function AdminDashboard() {
  return (
    <>
      {/* Header Dashboard */}
      <div className="flex items-center gap-2 mb-6">
        {/* SVG Icon untuk jam/dashboard, konsisten dengan Figma design */}
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
        <h1 className="text-3xl font-bold text-slate-800">Dashbord</h1>
      </div>

      {/* Grid Utama untuk Statistik dan Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Kolom Kiri - Area Grafik Besar */}
        <Card className="lg:col-span-2 min-h-[300px] flex items-center justify-center bg-slate-100"> {/* min-h untuk placeholder visual, bg-slate-100 untuk warna abu-abu */}
          {/* Konten ChartComponent Anda yang sudah ada */}
          <h3 className="font-semibold mb-4 text-slate-800">
            Tren Data Admin (Placeholder)
          </h3>
          <ChartComponent
            type="bar" // Asumsi type bar atau line
            data={adminChartData}
            options={{
              ...chartOptions,
              plugins: { legend: { display: false } },
            }}
          />
        </Card>

        {/* Kolom Kanan - Grid untuk StatCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {/* StatCard: Pesanan Perlu Tindakan */}
          <StatCard title="Pesanan Perlu Tindakan" value="5" /> {/* Contoh nilai */}
          {/* StatCard: Motor yang Disewa Hari Ini */}
          <StatCard title="Motor yang Disewa Hari Ini" value="3" /> {/* Contoh nilai */}
          {/* StatCard: Pengembalian Hari Ini */}
          <StatCard title="Pengembalian Hari Ini" value="2" /> {/* Contoh nilai */}
          {/* StatCard: Pendapatan Bulan Ini */}
          <StatCard title="Pendapatan Bulan Ini" value="Rp 15.000.000" /> {/* Contoh nilai */}
        </div>
      </div>

      {/* Bagian Bawah - Area Besar untuk Konten Tambahan */}
      <div className="mt-6">
        <Card className="min-h-[400px] flex items-center justify-center bg-slate-100"> {/* min-h untuk placeholder visual, bg-slate-100 untuk warna abu-abu */}
          {/* Placeholder untuk konten tambahan di bagian bawah */}
          <p className="text-slate-500">Area untuk Data Tambahan atau Tabel</p>
        </Card>
      </div>
    </>
  );
}
