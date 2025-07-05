import React, { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios"; // Pastikan path ini benar
import { formatRupiah } from "../../lib/navigation"; // Pastikan path ini benar
import ReportPanel from "../../components/ui/ReportPanel"; // Komponen panel baru
import StatCard from "../../components/ui/StatCard"; // Komponen StatCard yang sudah dimodifikasi
import { FileText, ClipboardList } from 'lucide-react';

export default function Laporan() {
  // --- BAGIAN LOGIKA & STATE (Tidak ada perubahan) ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("THIS_MONTH"); // Default ke Bulan Ini
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
    { label: "Bulan Ini", value: "THIS_MONTH" },
    { label: "Bulan Lalu", value: "LAST_MONTH" },
    { label: "7 Hari Terakhir", value: "LAST_7_DAYS" },
    { label: "Semua Waktu", value: "ALL_TIME" },
    { label: "Pilih Tanggal Manual", value: "CUSTOM" },
  ];

  const fetchAndCalculateFinancialData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/partner/transactions");
      const allTransactions = response.data.data;

      let filteredTransactions = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Logika filtering Anda, tetap sama
      if (selectedPeriod === "ALL_TIME") {
        filteredTransactions = allTransactions;
      } else if (selectedPeriod === "THIS_MONTH") {
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        filteredTransactions = allTransactions.filter(
          (t) => new Date(t.startDate) >= firstDayOfMonth && new Date(t.startDate) <= new Date()
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
          (t) => new Date(t.startDate) >= sevenDaysAgo && new Date(t.startDate) <= new Date()
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
  }, [selectedPeriod, customStartDate, customEndDate, COMMISSION_RATE, setLoading, setFinancialSummary, setError]);

  useEffect(() => {
    fetchAndCalculateFinancialData();
  }, [fetchAndCalculateFinancialData]);

  


  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
    if (e.target.value !== "CUSTOM") {
      setCustomStartDate("");
      setCustomEndDate("");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Memuat laporan...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Terjadi kesalahan: {error.message}</div>;
  }

  return (
    // Latar belakang utama halaman abu-abu muda, dengan padding responsif
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Area Judul Utama & Filter Periode --- */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-slate-700" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Report & Finance</h1>
              <p className="text-slate-500 mt-1">
                Rangkuman performa finansial rental Anda.
              </p>
            </div>
          </div>
          <select
            className="w-full sm:w-48 p-2 bg-white border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedPeriod}
            onChange={handlePeriodChange}
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* --- Panel Filter Tanggal Kustom (hanya muncul jika 'CUSTOM' dipilih) --- */}
        {selectedPeriod === "CUSTOM" && (
          <ReportPanel title="Pilih Rentang Tanggal">
            <div className="flex flex-wrap items-center gap-4">
              <input
                type="date"
                className="p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
              />
              <span className="text-slate-500">-</span>
              <input
                type="date"
                className="p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
              />
            </div>
          </ReportPanel>
        )}
        
        {/* --- Stat Cards (dipindahkan ke sini) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          <StatCard
            title="Pendapatan Kotor"
            value={formatRupiah(financialSummary.grossRevenue)}
          />
          <StatCard
            title="Komisi Platform (10%)"
            value={`- ${formatRupiah(financialSummary.commission)}`}
          />
          <StatCard
            title="Pendapatan Bersih"
            value={formatRupiah(financialSummary.netRevenue)}
          />
          <StatCard
            title="Transaksi Sukses"
            value={financialSummary.successfulTransactions}
          />
        </div>

        {/* --- Panel Riwayat Transaksi (Placeholder) --- */}
        <ReportPanel title="Riwayat Transaksi" actionButton="↓ Ekspor Semua Transaksi">
          <div className="text-slate-500 text-center py-12">
            <div className="flex flex-col items-center justify-center py-10">
              <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
              <p>Tidak ada data laporan yang ditemukan.</p>
            </div>
          </div>
        </ReportPanel>

      </div>
    </div>
  );
}