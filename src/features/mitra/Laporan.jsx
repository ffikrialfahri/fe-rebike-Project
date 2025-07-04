import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Card from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import { formatRupiah } from "../../lib/navigation";

export default function Laporan() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("ALL_TIME");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [financialSummary, setFinancialSummary] = useState({
    grossRevenue: 0,
    commission: 0,
    netRevenue: 0,
    successfulTransactions: 0,
  });

  const COMMISSION_RATE = 0.10;

  const periodOptions = [
    { label: "Semua Waktu", value: "ALL_TIME" },
    { label: "Bulan Ini", value: "THIS_MONTH" },
    { label: "Bulan Lalu", value: "LAST_MONTH" },
    { label: "7 Hari Terakhir", value: "LAST_7_DAYS" },
    { label: "Pilih Tanggal Manual", value: "CUSTOM" },
  ];

  useEffect(() => {
    fetchAndCalculateFinancialData();
  }, [selectedPeriod, customStartDate, customEndDate]);

  const fetchAndCalculateFinancialData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/partner/transactions");
      const allTransactions = response.data.data;

      let filteredTransactions = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedPeriod === "ALL_TIME") {
        filteredTransactions = allTransactions;
      } else if (selectedPeriod === "THIS_MONTH") {
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        filteredTransactions = allTransactions.filter(
          (t) => new Date(t.startDate) >= firstDayOfMonth && new Date(t.startDate) <= today
        );
      } else if (selectedPeriod === "LAST_MONTH") {
        const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        filteredTransactions = allTransactions.filter(
          (t) =>
            new Date(t.startDate) >= firstDayOfLastMonth &&
            new Date(t.startDate) <= lastDayOfLastMonth
        );
      } else if (selectedPeriod === "LAST_7_DAYS") {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        filteredTransactions = allTransactions.filter(
          (t) => new Date(t.startDate) >= sevenDaysAgo && new Date(t.startDate) <= today
        );
      } else if (selectedPeriod === "CUSTOM") {
        if (customStartDate && customEndDate) {
          const start = new Date(customStartDate);
          const end = new Date(customEndDate);
          end.setHours(23, 59, 59, 999);
          filteredTransactions = allTransactions.filter(
            (t) => new Date(t.startDate) >= start && new Date(t.startDate) <= end
          );
        }
      }

      const successfulTransactions = filteredTransactions.filter(
        (t) => t.bookingStatus === "COMPLETED"
      );

      const grossRevenue = successfulTransactions.reduce(
        (sum, t) => sum + t.totalPrice,
        0
      );
      const commission = grossRevenue * COMMISSION_RATE;
      const netRevenue = grossRevenue - commission;

      setFinancialSummary({
        grossRevenue,
        commission,
        netRevenue,
        successfulTransactions: successfulTransactions.length,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
    if (e.target.value !== "CUSTOM") {
      setCustomStartDate("");
      setCustomEndDate("");
    }
  };

  if (loading) {
    return <p>Memuat laporan finansial...</p>;
  }

  if (error) {
    return <p>Error memuat laporan finansial: {error.message}</p>;
  }

  return (
    <>
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
            d="M2.25 18.75a60.023 60.023 0 0 0 18 0M21.75 12a60.023 60.023 0 0 0-18 0M2.25 5.25a60.023 60.023 0 0 0 18 0M12 4.5v15" 
          />
        </svg>
        <h1 className="text-3xl font-bold text-slate-800">Laporan & Keuangan</h1>
      </div>

      <Card className="mb-6">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Area Untuk Laporan Detail</h3>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={selectedPeriod}
            onChange={handlePeriodChange}
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {selectedPeriod === "CUSTOM" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="p-2 border border-gray-300 rounded-md"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
              />
              <span>-</span>
              <input
                type="date"
                className="p-2 border border-gray-300 rounded-md"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={fetchAndCalculateFinancialData}
              >
                Terapkan
              </button>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pendapatan Kotor"
          value={formatRupiah(financialSummary.grossRevenue)}
          valueColor="text-green-600"
        />
        <StatCard
          title="Komisi (10%)"
          value={formatRupiah(financialSummary.commission)}
          valueColor="text-orange-600"
        />
        <StatCard
          title="Pendapatan Bersih"
          value={formatRupiah(financialSummary.netRevenue)}
          valueColor="text-blue-600"
        />
        <StatCard
          title="Transaksi Sukses"
          value={financialSummary.successfulTransactions}
          valueColor="text-purple-600"
        />
      </div>
    </>
  );
}