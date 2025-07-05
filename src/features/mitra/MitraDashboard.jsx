import { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import ChartComponent from "../../components/ui/ChartComponent";
import axios from "../../api/axios";
import { formatRupiah } from "../../lib/navigation";
import { LayoutDashboard, ClipboardList } from "lucide-react";

export default function MitraDashboard() {
  const [summary, setSummary] = useState(null);
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

        setSummary(summaryRes.data.data);
        setBikes(bikesRes.data.data.totalElements);
        setTransactions(transactionsRes.data.data);
        setRevenueTrend(revenueTrendRes.data.data);
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
        <Card className="min-h-[400px] p-4">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">
            Aktivitas Terbaru (Booking)
          </h3>
          {transactions.length > 0 ? (
            <ul className="space-y-3">
              {transactions.slice(0, 5).map((transaction) => (
                <li
                  key={transaction.transactionID}
                  className="p-3 bg-gray-50 rounded-md shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      Booking ID: {transaction.transactionID.substring(0, 8)}...
                    </p>
                    <p className="text-sm text-slate-600">
                      Status: {transaction.bookingStatus}
                    </p>
                  </div>
                  <span className="font-semibold text-lg text-indigo-600">
                    {formatRupiah(transaction.totalPrice)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-slate-500">
              <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
              <p>Belum ada aktivitas booking terbaru.</p>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}