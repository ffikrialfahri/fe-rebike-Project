import StatCard from "../../components/ui/StatCard";
import ChartComponent from "../../components/ui/ChartComponent";
import Card from "../../components/ui/Card";
import { mitraChartData, chartOptions } from "../../lib/chart-config";

export default function MitraDashboard() {
  return (
    <>
      {/* Header Dashboard */}
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
        <h1 className="text-3xl font-bold text-slate-800">Dashbord</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Kolom Kiri - Area Grafik Besar */}
        
        {/* Kolom Kanan - Grid untuk StatCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {/* StatCard: Order */}
        </div>
      </div>

      <div className="mt-6">

      </div>
    </>
  );
}
