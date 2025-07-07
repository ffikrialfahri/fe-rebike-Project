import { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import ChartComponent from "../../components/ui/ChartComponent";
import axios from "../../api/axios";
import { formatRupiah } from "../../lib/navigation";
import { LayoutDashboard } from "lucide-react";
import RecentBookingsTable from "../../components/shared/RecentBookingsTable";

export default function MitraDashboard() {
  const [summary, setSummary] = useState({ totalRevenue: 0 });
  const [bikes, setBikes] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [revenueTrend, setRevenueTrend] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          summaryRes,
          bikesRes,
          transactionsRes,
          revenueTrendRes,
        ] = await Promise.all([
          axios.get("/partner/financial-summary"),
          axios.get("/partner/bikes"),
          axios.get("/partner/transactions"),
          axios.get("/partner/dashboard/revenue-trend"),
        ]);

        setSummary(summaryRes.data?.data || { totalRevenue: 0 });
        setBikes(bikesRes.data?.data?.totalElements || 0);
        setTransactions(transactionsRes.data?.data?.data || []);
        setRevenueTrend(revenueTrendRes.data?.data || {});
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading dashboard data...</p>;
  }

  if (error) {
    return <p>Error loading dashboard data: {error.message}</p>;
  }
  
  if (!summary) {
    return <p>Data summary tidak tersedia.</p>;
  }

  const chartData = {
    labels: Object.keys(revenueTrend.monthlyRevenue || {}),
    datasets: [
      {
        label: "Pendapatan Bulanan",
        data: Object.values(revenueTrend.monthlyRevenue || {}),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  return (
    <>
      <div className="flex items-center gap-4 mb-10 pt-10">
        <LayoutDashboard className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 min-h-[300px] p-4 flex flex-col">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">
             Pendapatan Bulanan
          </h3>
          <div className="flex-grow">
            <ChartComponent type="line" data={chartData} options={chartOptions} />
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <div className="flex-grow grid grid-cols-2 gap-6 items-center text-center ">
            <StatCard
              title="Order"
              value={transactions.length}
              valueColor="text-blue-600"
              contentAlign="left"
              valueAlign="center"
              iconType="order"
            />
            <StatCard
              title="Product"
              value={bikes}
              valueColor="text-green-600"
              contentAlign="left"
              valueAlign="center"
              iconType="product"
            />
          </div>
          <div className="flex-grow">
            <StatCard
              title={"Income"}
              value={formatRupiah(summary.totalRevenue)}
              valueColor="text-purple-600"
              className="h-full"
              contentAlign="left"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <RecentBookingsTable
          title="Aktivitas Terbaru (Booking)"
          transactions={transactions}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
}