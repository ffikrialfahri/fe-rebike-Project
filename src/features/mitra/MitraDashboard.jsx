import StatCard from "../../components/ui/StatCard";
import ChartComponent from "../../components/ui/ChartComponent";
import Card from "../../components/ui/Card";
import BookingCalendar from "../../components/ui/BookingCalendar";
import { mitraChartData, chartOptions } from "../../lib/chart-config";

export default function MitraDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Pesanan" value="124" />
        <StatCard title="Pendapatan (Bulan Ini)" value="Rp 5.250.000" />
        <StatCard title="Motor Tersedia" value="8" detail="10" />
        <StatCard
          title="Pesanan Baru"
          value="3"
          valueColor="text-brand-primary"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <h3 className="font-semibold mb-4 text-slate-800">
            Tren Pendapatan Bulanan
          </h3>
          <ChartComponent
            type="bar"
            data={mitraChartData}
            options={{
              ...chartOptions,
              plugins: { legend: { display: false } },
            }}
          />
        </Card>
        <Card className="lg:col-span-2">
          <h3 className="font-semibold mb-4 text-slate-800">
            Pesanan Menunggu Konfirmasi
          </h3>
          <div className="space-y-3 text-sm">
            <div className="border border-slate-200 p-3 rounded-md bg-slate-50">
              <p className="font-medium text-slate-700">Andi - Honda Vario</p>
              <p className="text-xs text-slate-500">2 hari (Mulai Besok)</p>
              <div className="flex gap-2 mt-2">
                <button className="bg-teal-500 text-white px-3 py-1 rounded-md text-xs hover:bg-teal-600 transition">
                  Terima
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition">
                  Tolak
                </button>
              </div>
            </div>
            <div className="border border-slate-200 p-3 rounded-md bg-slate-50">
              <p className="font-medium text-slate-700">Budi - Yamaha NMAX</p>
              <p className="text-xs text-slate-500">1 hari (Mulai 30 Jun)</p>
              <div className="flex gap-2 mt-2">
                <button className="bg-teal-500 text-white px-3 py-1 rounded-md text-xs hover:bg-teal-600 transition">
                  Terima
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 transition">
                  Tolak
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-6">
        <BookingCalendar />
      </div>
    </>
  );
}
