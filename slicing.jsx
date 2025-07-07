import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import { LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  // Data placeholder untuk tujuan slicing
  const stats = {
    mitraMenunggu: 5,
    motorDisewa: 12,
    pengembalianHariIni: 3,
    penggunaBaru: 28,
  };

  return (
    <div className="space-y-6">
      {/* Header Dashboard */}
      <div className="flex items-center gap-4 mb-6">
        <LayoutDashboard className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
      </div>

      {/* Grid Utama - Memisahkan baris atas dan bawah */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --- KOLOM KIRI (LEBAR) --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Baris Atas - Kolom Kiri: Live Feed */}
          <Card className="min-h-[250px] flex flex-col">
            <h3 className="text-lg font-semibold text-slate-700">Live Feed</h3>
            <div className="flex-grow flex items-center justify-center text-slate-400">
              <p>Konten Live Feed akan muncul di sini.</p>
            </div>
          </Card>

          {/* Baris Bawah - Kolom Kiri: Pendapatan & Sengketa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="min-h-[150px] flex flex-col">
              <h3 className="text-lg font-semibold text-slate-700">Pendapatan Bulan Ini</h3>
              <div className="flex-grow flex items-center justify-center text-slate-400">
                <p>Grafik/Data Pendapatan</p>
              </div>
            </Card>
            <Card className="min-h-[150px] flex flex-col">
              <h3 className="text-lg font-semibold text-slate-700">Sengketa Aktif</h3>
               <div className="flex-grow flex items-center justify-center text-slate-400">
                <p>Daftar Sengketa</p>
              </div>
            </Card>
          </div>
        </div>

        {/* --- KOLOM KANAN (SEMPIT) --- */}
        <div className="lg:col-span-1 space-y-6">

          {/* Empat Kotak Statistik di Kanan Atas */}
          <div className="grid grid-cols-2 gap-6">
            <StatCard
              title="Mitra Menunggu Verifikasi"
              value={stats.mitraMenunggu}
            />
            <StatCard
              title="Motor yang Disewa Hari Ini"
              value={stats.motorDisewa}
            />
            <StatCard
              title="Pengembalian Hari Ini"
              value={stats.pengembalianHariIni}
            />
            <StatCard
              title="Pengguna baru 7(hari lalu)"
              value={stats.penggunaBaru}
            />
          </div>

          {/* Quick Access di Kanan Bawah */}
          <Card className="min-h-[300px] flex flex-col">
            <h3 className="text-lg font-semibold text-slate-700">Quick Acces</h3>
            <div className="flex-grow flex items-center justify-center text-slate-400">
              <p>Tombol/Link Cepat</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}