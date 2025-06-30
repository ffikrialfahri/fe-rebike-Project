import StatCard from "../../components/ui/StatCard";
import ChartComponent from "../../components/ui/ChartComponent";
import Card from "../../components/ui/Card";
import { adminChartData, chartOptions } from "../../lib/chart-config";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pengguna" value="1,250" />
        <StatCard title="Total Mitra" value="50" />
        <StatCard title="Total Transaksi" value="890" />
        <StatCard
          title="Pendapatan Platform"
          value="Rp 12.3jt"
          valueColor="text-teal-600"
        />
      </div>
      <Card>
        <h3 className="font-semibold mb-4 text-slate-800">
          Grafik Pertumbuhan Pengguna (Customer vs Mitra)
        </h3>
        <ChartComponent
          type="line"
          data={adminChartData}
          options={chartOptions}
        />
      </Card>
    </div>
  );
}
