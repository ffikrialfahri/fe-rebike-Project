import React, { useEffect, useState } from 'react';
import Card from "../../components/ui/Card";
import { ArrowRightLeft, ClipboardList } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../store/admin/adminSlice";
import { format } from 'date-fns';

export default function Transaction() {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.admin);

  const [selectedStatus, setSelectedStatus] = useState('Semua');

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const filteredTransactions = selectedStatus === 'Semua'
    ? transactions
    : transactions.filter(t => t.bookingStatus === selectedStatus.toUpperCase());

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
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Dikonfirmasi</option>
              <option value="IN_PROGRESS">Dalam Proses</option>
              <option value="COMPLETED">Selesai</option>
              <option value="CANCELLED">Dibatalkan</option>
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
                  Start Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status Pembayaran
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-slate-500">
                    Memuat data transaksi...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-slate-500">
                    Error memuat data transaksi: {error.message}
                  </td>
                </tr>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.transactionID}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{transaction.transactionID}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{transaction.customer.firstName}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{format(new Date(transaction.startDate), 'dd/MM/yyyy HH:mm')}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{format(new Date(transaction.endDate), 'dd/MM/yyyy HH:mm')}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Rp {transaction.totalCost.toLocaleString('id-ID')}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                          transaction.paymentStatus === 'PAID' ? 'text-green-900' :
                          transaction.paymentStatus === 'CANCELLED' || transaction.paymentStatus === 'EXPIRED' ? 'text-red-900' :
                          'text-yellow-900'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 opacity-50 rounded-full ${
                            transaction.paymentStatus === 'PAID' ? 'bg-green-200' :
                            transaction.paymentStatus === 'CANCELLED' || transaction.paymentStatus === 'EXPIRED' ? 'bg-red-200' :
                            'bg-yellow-200'
                          }`}
                        ></span>
                        <span className="relative">{transaction.paymentStatus}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                          transaction.bookingStatus === 'COMPLETED' ? 'text-green-900' :
                          transaction.bookingStatus === 'CANCELLED' ? 'text-red-900' :
                          'text-yellow-900'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 opacity-50 rounded-full ${
                            transaction.bookingStatus === 'COMPLETED' ? 'bg-green-200' :
                            transaction.bookingStatus === 'CANCELLED' ? 'bg-red-200' :
                            'bg-yellow-200'
                          }`}
                        ></span>
                        <span className="relative">{transaction.bookingStatus}</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-slate-500">
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
