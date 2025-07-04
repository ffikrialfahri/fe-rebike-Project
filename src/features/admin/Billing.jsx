import React from 'react';
import Card from "../../components/ui/Card";

export default function Billing() {
  const currentBalance = "Rp 1.500.000";
  const bankName = "Bank Central Asia (BCA)";
  const accountNumber = "1234567890";
  const accountHolder = "Admin Rebike";

  const transactions = [
    { id: 1, date: "2024-06-28", description: "Pembayaran Sewa Bulan Juni", amount: "Rp 500.000", status: "Lunas" },
    { id: 2, date: "2024-05-28", description: "Pembayaran Sewa Bulan Mei", amount: "Rp 500.000", status: "Lunas" },
    { id: 3, date: "2024-04-28", description: "Pembayaran Sewa Bulan April", amount: "Rp 500.000", status: "Lunas" },
    { id: 4, date: "2024-07-01", description: "Tagihan Sewa Bulan Juli", amount: "Rp 500.000", status: "Belum Lunas" },
  ];

  const withdrawalHistory = [
    { id: 1, date: "2024-06-29", amount: "Rp 1.000.000", status: "Berhasil" },
    { id: 2, date: "2024-05-30", amount: "Rp 500.000", status: "Berhasil" },
    { id: 3, date: "2024-04-25", amount: "Rp 750.000", status: "Berhasil" },
  ];

  const handleWithdraw = () => {
    alert("Fungsi cairkan semua dana akan diimplementasikan di sini.");
  };

  const handleChangeAccount = () => {
    alert("Fungsi ubah rekening akan diimplementasikan di sini.");
  };

  return (
    <>
      {/* Header Billing */}
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
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-slate-800">Billing</h1>
      </div>

      {/* Container for Top Section (Balance and Account Panels) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Balance Panel */}
        <Card className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Saldo Tersedia</h2>
          <p className="text-3xl font-bold text-indigo-600 mb-4">{currentBalance}</p>
          <button
            onClick={handleWithdraw}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Cairkan Semua Dana
          </button>
        </Card>
        {/* Account Panel */}
        <Card className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Informasi Rekening</h2>
          <p className="text-lg text-slate-600">Bank: {bankName}</p>
          <p className="text-lg text-slate-600">Nomor Rekening: {accountNumber}</p>
          <p className="text-lg text-slate-600 mb-4">Atas Nama: {accountHolder}</p>
          <button
            onClick={handleChangeAccount}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Ubah Rekening
          </button>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="p-6 bg-white shadow-md rounded-lg mb-6"> {/* Added mb-6 for spacing */}
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Riwayat Transaksi</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Deskripsi
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
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{transaction.date}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{transaction.description}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{transaction.amount}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                        transaction.status === "Lunas" ? "text-green-900" : "text-red-900"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 opacity-50 rounded-full ${
                          transaction.status === "Lunas" ? "bg-green-200" : "bg-red-200"
                        }`}
                      ></span>
                      <span className="relative">{transaction.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Withdrawal History */}
      <Card className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Riwayat Pencairan</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tanggal
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
              {withdrawalHistory.map((withdrawal) => (
                <tr key={withdrawal.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{withdrawal.date}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{withdrawal.amount}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                        withdrawal.status === "Berhasil" ? "text-green-900" : "text-red-900"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 opacity-50 rounded-full ${
                          withdrawal.status === "Berhasil" ? "bg-green-200" : "bg-red-200"
                        }`}
                      ></span>
                      <span className="relative">{withdrawal.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
