import React, { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios";
import Card from "../../components/ui/Card";
import { formatRupiah } from "../../lib/navigation";
import { ArrowRightLeft, ClipboardList } from 'lucide-react';

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const statusOptions = [
    { name: "Semua", value: "ALL" },
    { name: "Pending", value: "PENDING" },
    { name: "Dikonfirmasi", value: "CONFIRMED" },
    { name: "Selesai", value: "COMPLETED" },
    { name: "Dibatalkan", value: "CANCELLED" },
  ];

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/partner/transactions");
      let fetchedTransactions = Array.isArray(response.data.data?.data) ? response.data.data.data : [];

      if (selectedStatus !== "ALL") {
        fetchedTransactions = fetchedTransactions.filter(
          (transaction) => transaction.bookingStatus === selectedStatus
        );
      }
      setTransactions(fetchedTransactions);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, setLoading, setTransactions, setError]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  if (loading) {
    return <p>Memuat data transaksi...</p>;
  }

  if (error) {
    return <p>Error memuat data transaksi: {error.message}</p>;
  }

  return (
    <>
      <div className="flex items-center gap-5 mb-10 pt-10">
        <ArrowRightLeft className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Transaksi</h1>
      </div>
      <div className="mb-5 mt-10">
        <div className="flex items-center">
            <label htmlFor="status-filter" className="mr-2 text-slate-600 text-xl font-bold">Filter Status:</label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
      </div>

      <Card className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-slate-700">Daftar Transaksi</h2>
        </div>

        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-500">
            <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
            <p>Tidak ada transaksi yang ditemukan untuk status ini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">ID Transaksi</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Motor</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Penyewa</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Tanggal Sewa</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Tanggal Kembali</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Total Harga</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Status</th>
                  <th className="py-2 px-4 border-b bg-gray-100 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.transactionID}>
                    <td className="py-2 px-4 border-b">{transaction.transactionID}</td>
                    <td className="py-2 px-4 border-b">{transaction.bike.name}</td>
                    <td className="py-2 px-4 border-b">{transaction.customer.firstName} {transaction.customer.lastName}</td>
                    <td className="py-2 px-4 border-b">{new Date(transaction.startDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{new Date(transaction.endDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{formatRupiah(transaction.totalCost)}</td>
                    <td className="py-2 px-4 border-b">{transaction.bookingStatus}</td>
                    <td className="py-2 px-4 border-b">
                      {transaction.bookingStatus === "PENDING" ? (
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
                          Dalam Antrian
                        </span>
                      ) : (
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
                          {transaction.bookingStatus}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}