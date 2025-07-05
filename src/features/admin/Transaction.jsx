import React, { useState } from 'react';
import Card from "../../components/ui/Card";
import { ArrowRightLeft, ClipboardList } from 'lucide-react';

export default function Transaction() {
  const [selectedStatus, setSelectedStatus] = useState('Semua');

  const transactions = [
    { id: 1, bookingId: 'BK001', user: 'John Doe', bike: 'Sepeda A', status: 'Pending', amount: 'Rp 100.000' },
    { id: 2, bookingId: 'BK002', user: 'Jane Smith', bike: 'Sepeda B', status: 'Dikonfirmasi', amount: 'Rp 150.000' },
    { id: 3, bookingId: 'BK003', user: 'Peter Jones', bike: 'Sepeda C', status: 'Dalam Proses', amount: 'Rp 200.000' },
    { id: 4, bookingId: 'BK004', user: 'Alice Brown', bike: 'Sepeda A', status: 'Selesai', amount: 'Rp 120.000' },
    { id: 5, bookingId: 'BK005', user: 'Bob White', bike: 'Sepeda D', status: 'Dibatalkan', amount: 'Rp 80.000' },
    { id: 6, bookingId: 'BK006', user: 'John Doe', bike: 'Sepeda B', status: 'Pending', amount: 'Rp 110.000' },
  ];

  const filteredTransactions = selectedStatus === 'Semua'
    ? transactions
    : transactions.filter(t => t.status === selectedStatus);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <>
      {/* Header Transaksi */}
      <div className="flex items-center gap-4 mb-6">
        <ArrowRightLeft className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Transactions</h1>
      </div>

      {/* Kontainer untuk Filter dan Tabel Transaksi */}
      <Card className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-slate-700">Daftar Transaksi</h2>
          <div className="flex items-center">
            <label htmlFor="status-filter" className="mr-2 text-slate-600">Filter Status:</label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
            >
              <option value="Semua">Semua</option>
              <option value="Pending">Pending</option>
              <option value="Dikonfirmasi">Dikonfirmasi</option>
              <option value="Dalam Proses">Dalam Proses</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pengguna
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Motor
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{transaction.bookingId}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{transaction.user}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{transaction.bike}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{transaction.amount}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                          transaction.status === 'Selesai' ? 'text-green-900' :
                          transaction.status === 'Dibatalkan' ? 'text-red-900' :
                          'text-yellow-900'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 opacity-50 rounded-full ${
                            transaction.status === 'Selesai' ? 'bg-green-200' :
                            transaction.status === 'Dibatalkan' ? 'bg-red-200' :
                            'bg-yellow-200'
                          }`}
                        ></span>
                        <span className="relative">{transaction.status}</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center py-10">
                      <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
                      <p>Tidak ada transaksi yang ditemukan.</p>
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
