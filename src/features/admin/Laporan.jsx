import React from "react";
import Card from "../../components/ui/Card";
import { FileText, ClipboardList, AlertTriangle, Lightbulb } from 'lucide-react';

import { formatRupiah } from "../../lib/navigation";
import StatCard from "../../components/ui/StatCard";

export default function Laporan() {
  const dashboardSummary = {
    totalUsers: 1200,
    totalPartners: 50,
    totalTransactions: 850,
    platformRevenue: 12500000, // Contoh dalam Rupiah
  };

  const fraudAlerts = [
    {
      transactionId: 'TXN001',
      customerName: 'Budi Santoso',
      bikeName: 'Honda Vario 150',
      transactionDate: new Date('2024-07-01T10:00:00Z'),
      totalCost: 150000,
      reason: 'Frequent rentals (5x in 24h) by user.',
    },
    {
      transactionId: 'TXN002',
      customerName: 'Siti Aminah',
      bikeName: 'Yamaha NMAX',
      transactionDate: new Date('2024-07-02T14:30:00Z'),
      totalCost: 200000,
      reason: 'Unusual booking pattern.',
    },
  ];

  const businessRecommendations = [
    {
      recommendation: 'Lakukan promosi untuk pengguna baru.',
      reason: 'Pertumbuhan pengguna baru bulan ini melambat signifikan dibandingkan bulan lalu.',
      severity: 'HIGH',
    },
    {
      recommendation: 'Optimalkan harga sewa motor di akhir pekan.',
      reason: 'Tingkat pemanfaatan motor rendah pada hari Sabtu dan Minggu.',
      severity: 'MEDIUM',
    },
    {
      recommendation: 'Perbarui kebijakan penggunaan untuk motor tertentu.',
      reason: 'Banyak keluhan terkait penggunaan motor model X.',
      severity: 'LOW',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Area Judul Utama --- */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-slate-700" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Report & Finance</h1>
              <p className="text-slate-500 mt-1">
                Rangkuman performa finansial dan operasional platform.
              </p>
            </div>
          </div>
        </div>

        {/* --- Stat Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Pengguna"
            value={dashboardSummary?.totalUsers?.toLocaleString() || '0'}
          />
          <StatCard
            title="Total Mitra"
            value={dashboardSummary?.totalPartners?.toLocaleString() || '0'}
          />
          <StatCard
            title="Total Transaksi"
            value={dashboardSummary?.totalTransactions?.toLocaleString() || '0'}
          />
          <StatCard
            title="Pendapatan Platform"
            value={formatRupiah(dashboardSummary?.platformRevenue || 0)}
          />
        </div>

        {/* --- Fraud Alerts --- */}
        <Card className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" /> Peringatan Penipuan
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID Transaksi
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nama Pelanggan
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nama Motor
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tanggal Transaksi
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Alasan
                  </th>
                </tr>
              </thead>
              <tbody>
                {fraudAlerts && fraudAlerts.length > 0 ? (
                  fraudAlerts.map((alert) => (
                    <tr key={alert.transactionId}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{alert.transactionId}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{alert.customerName}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{alert.bikeName}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{new Date(alert.transactionDate).toLocaleString()}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{formatRupiah(alert.totalCost)}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-red-600 font-medium">{alert.reason}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center py-10">
                        <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
                        <p>Tidak ada peringatan penipuan saat ini.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* --- Business Recommendations --- */}
        <Card className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" /> Rekomendasi Bisnis
          </h2>
          <div className="overflow-x-auto">
            {businessRecommendations && businessRecommendations.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {businessRecommendations.map((rec, index) => (
                  <li key={index}>
                    <p className="font-semibold">{rec.recommendation}</p>
                    <p className="text-sm text-slate-600">Alasan: {rec.reason}</p>
                    <p className={`text-xs font-medium ${
                      rec.severity === 'HIGH' ? 'text-red-500' :
                      rec.severity === 'MEDIUM' ? 'text-orange-500' :
                      'text-green-500'
                    }`}>Prioritas: {rec.severity}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-500">
                <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
                <p>Tidak ada rekomendasi bisnis saat ini.</p>
              </div>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}