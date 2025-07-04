import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Card from "../../components/ui/Card";
import { formatRupiah } from "../../lib/navigation";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL");

  const tabs = [
    { name: "Semua", status: "ALL" },
    { name: "Pending", status: "PENDING" },
    { name: "Dikonfirmasi", status: "CONFIRMED" },
    { name: "Dalam Proses", status: "IN_PROGRESS" },
    { name: "Selesai", status: "COMPLETED" },
    { name: "Dibatalkan", status: "CANCELLED" },
  ];

  useEffect(() => {
    fetchTransactions();
  }, [activeTab]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/partner/transactions");
      let fetchedTransactions = response.data.data;

      if (activeTab !== "ALL") {
        fetchedTransactions = fetchedTransactions.filter(
          (transaction) => transaction.bookingStatus === activeTab
        );
      }
      setTransactions(fetchedTransactions);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (transactionId, newStatus) => {
    try {
      await axios.post(`/partner/transactions/${transactionId}/confirm`, {
        status: newStatus,
      });
      alert(`Status transaksi ${transactionId} berhasil diperbarui menjadi ${newStatus}`);
      fetchTransactions();
    } catch (err) {
      alert("Gagal memperbarui status transaksi: " + err.message);
    }
  };

  if (loading) {
    return <p>Memuat data transaksi...</p>;
  }

  if (error) {
    return <p>Error memuat data transaksi: {error.message}</p>;
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
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25V6.75c0-.621-.504-1.125-1.125-1.125H12a2.25 2.25 0 0 0-2.25 2.25v10.5M6 7.5h-.75m0 0H5.25m0 0A2.25 2.25 0 0 0 3 9.75v9.75a2.25 2.25 0 0 0 2.25 2.25h1.5h-.75ZM12 7.5h-.75" 
          />
        </svg>
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Transaksi</h1>
      </div>

      <Card className="mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.status}
              className={`py-2 px-4 -mb-px text-sm font-medium focus:outline-none ${activeTab === tab.status
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"}
              `}
              onClick={() => setActiveTab(tab.status)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Daftar Transaksi ({tabs.find(t => t.status === activeTab).name})</h3>
        {transactions.length === 0 ? (
          <p className="text-slate-500">Tidak ada transaksi yang ditemukan untuk status ini.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID Transaksi</th>
                  <th className="py-2 px-4 border-b text-left">Motor</th>
                  <th className="py-2 px-4 border-b text-left">Penyewa</th>
                  <th className="py-2 px-4 border-b text-left">Tanggal Sewa</th>
                  <th className="py-2 px-4 border-b text-left">Tanggal Kembali</th>
                  <th className="py-2 px-4 border-b text-left">Total Harga</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.transactionID}>
                    <td className="py-2 px-4 border-b">{transaction.transactionID}</td>
                    <td className="py-2 px-4 border-b">{transaction.bikeName}</td>
                    <td className="py-2 px-4 border-b">{transaction.customerName}</td>
                    <td className="py-2 px-4 border-b">{new Date(transaction.startDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{new Date(transaction.endDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{formatRupiah(transaction.totalPrice)}</td>
                    <td className="py-2 px-4 border-b">{transaction.bookingStatus}</td>
                    <td className="py-2 px-4 border-b">
                      {transaction.bookingStatus === "PENDING" && (
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-md text-sm mr-2"
                          onClick={() => handleUpdateStatus(transaction.transactionID, "CONFIRMED")}
                        >
                          Konfirmasi
                        </button>
                      )}
                      {transaction.bookingStatus === "CONFIRMED" && (
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mr-2"
                          onClick={() => handleUpdateStatus(transaction.transactionID, "IN_PROGRESS")}
                        >
                          Mulai Sewa
                        </button>
                      )}
                      {transaction.bookingStatus === "IN_PROGRESS" && (
                        <button
                          className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm mr-2"
                          onClick={() => handleUpdateStatus(transaction.transactionID, "COMPLETED")}
                        >
                          Selesai Sewa
                        </button>
                      )}
                      {(transaction.bookingStatus === "PENDING" || transaction.bookingStatus === "CONFIRMED") && (
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                          onClick={() => handleUpdateStatus(transaction.transactionID, "CANCELLED")}
                        >
                          Batalkan
                        </button>
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