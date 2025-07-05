import React, { useState } from 'react';
import Card from "../../components/ui/Card";
import { History, ClipboardList } from 'lucide-react';

export default function HistoryPage() {
  const [selectedType, setSelectedType] = useState('Semua');

  const logTypes = [
    { name: 'Semua', value: 'Semua' },
    { name: 'Login', value: 'Login' },
    { name: 'Transaksi', value: 'Transaksi' },
    { name: 'Sistem', value: 'Sistem' },
  ];

  const historyLogs = [
    { id: 1, date: '2024-07-01 10:00', type: 'Login', description: 'Pengguna John Doe berhasil login.' },
    { id: 2, date: '2024-07-01 10:30', type: 'Transaksi', description: 'Transaksi BK001 selesai.' },
    { id: 3, date: '2024-07-01 11:00', type: 'Sistem', description: 'Sistem diperbarui ke versi 2.0.' },
    { id: 4, date: '2024-07-01 11:15', type: 'Login', description: 'Pengguna Jane Smith gagal login.' },
    { id: 5, date: '2024-07-01 11:45', type: 'Transaksi', description: 'Transaksi BK002 dibatalkan.' },
  ];

  const filteredLogs = selectedType === 'Semua'
    ? historyLogs
    : historyLogs.filter(log => log.type === selectedType);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <>
      {/* Header History */}
      <div className="flex items-center gap-4 mb-6">
        <History className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">History</h1>
      </div>

      {/* Kontainer untuk Area Utama History */}
      <Card className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-slate-700">Feed Log</h2>
          <div className="flex items-center">
            <label htmlFor="type-filter" className="mr-2 text-slate-600">Filter Tipe:</label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={handleTypeChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
            >
              {logTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tanggal & Waktu
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tipe
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Deskripsi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{log.date}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{log.type}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{log.description}</p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center py-10">
                      <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
                      <p>Tidak ada log ditemukan untuk tipe ini.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
