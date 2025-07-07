import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import ChartComponent from "../../components/ui/ChartComponent";
import axios from "../../api/axios";
import { formatRupiah } from "../../lib/navigation";
import { LayoutDashboard, UserCheck } from "lucide-react";
import RecentBookingsTable from "../../components/shared/RecentBookingsTable";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardSummary, fetchPartners, fetchTransactions } from '../../store/admin/adminSlice';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { dashboardSummary, partners, transactions, loading, error } = useSelector((state) => state.admin);

  const [unverifiedPartnersCount, setUnverifiedPartnersCount] = useState(0);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
    dispatch(fetchPartners({ name: '' })); // Fetch partners for unverified count
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (partners && partners.length > 0) {
      const unverified = partners.filter(partner => !partner.verified);
      setUnverifiedPartnersCount(unverified.length);
    }
  }, [partners]);

  if (loading) {
    return <p>Memuat data dashboard...</p>;
  }

  if (error) {
    return <p>Error memuat data dashboard: {error.message}</p>;
  }
  
  if (!dashboardSummary) {
    return <p>Data ringkasan dashboard tidak tersedia.</p>;
  }

  const chartData = {
    labels: dashboardSummary.userGrowth?.labels || [],
    datasets: [
      {
        label: "Pertumbuhan Pengguna",
        data: dashboardSummary.userGrowth?.data || [],
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
      <div className="flex items-center gap-4 mb-6">
        <LayoutDashboard className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        <Card className="lg:col-span-2 min-h-[300px] p-4 flex flex-col">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">
            Tren Pertumbuhan Pengguna
          </h3>
          <div className="flex-grow">
            <ChartComponent type="line" data={chartData} options={chartOptions} />
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <div className="flex-grow grid grid-cols-2 gap-6 items-center text-center ">
            <Link to="/admin/mitra-verification">
              <StatCard
                title="Verifikasi Mitra"
                value={unverifiedPartnersCount}
                valueColor="text-blue-600"
                contentAlign="left"
                valueAlign="center"
                iconType="userCheck"
              />
            </Link>
            <StatCard
              title="Total Mitra"
              value={dashboardSummary?.totalPartners?.toLocaleString() || '0'}
              valueColor="text-green-600"
              contentAlign="left"
              valueAlign="center"
              iconType="product"
            />
          </div>
          <div className="flex-grow">
            <StatCard
              title={"Pendapatan Platform"}
              value={formatRupiah(dashboardSummary?.platformRevenue || 0)}
              valueColor="text-purple-600"
              className="h-full"
              contentAlign="left"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <RecentBookingsTable
          title="Transaksi Terbaru"
          subtitle="Aktivitas Transaksi Terbaru"
          transactions={transactions}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
}
