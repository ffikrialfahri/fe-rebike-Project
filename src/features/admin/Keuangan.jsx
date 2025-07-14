import React, { useEffect, useState } from 'react';
import Card from "../../components/ui/Card";
import { Landmark, History, CircleDollarSign } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardSummary, fetchPayouts, processPayout, fetchTransactions } from '../../store/admin/adminSlice';
import ProcessPayoutModal from '../../components/modals/ProcessPayoutModal';

export default function Keuangan() {
  const dispatch = useDispatch();
  const { dashboardSummary, payouts, transactions, loading, error } = useSelector((state) => state.admin);

  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [activeTab, setActiveTab] = useState('payoutRequests'); // State for active tab

  useEffect(() => {
    dispatch(fetchDashboardSummary());
    dispatch(fetchPayouts());
    dispatch(fetchTransactions({ page: 0, size: 100 })); // Fetch transactions for platform revenue history
  }, [dispatch]);

  const handleProcessPayoutClick = (payout) => {
    setSelectedPayout(payout);
    setIsProcessModalOpen(true);
  };

  const handleConfirmProcessPayout = (payoutId, status, notes) => {
    dispatch(processPayout({ payoutId, status, notes }));
  };

  if (loading) {
    return <p>Memuat data keuangan...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const pendingPayouts = payouts.filter(p => p.status === 'PENDING');
  const historyPayouts = payouts.filter(p => p.status !== 'PENDING');

  return (
    <>
      {/* Header Keuangan */}
      <div className="flex items-center gap-4 mb-6">
        <Landmark className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Permintaan Pencairan Dana</h1>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Pendapatan Platform</h2>
          <p className="text-3xl font-bold text-indigo-600 mb-4">Rp {dashboardSummary?.platformRevenue?.toLocaleString('id-ID') || '0'}</p>
        </Card>
      </div> */}

      {/* Tabs for Financial Data */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('payoutRequests')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payoutRequests'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Permintaan Pencairan
            </button>
            <button
              onClick={() => setActiveTab('payoutHistory')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payoutHistory'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              History Pencairan
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <Card className="p-6 bg-white shadow-md rounded-lg">
        {activeTab === 'payoutRequests' && (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Permintaan Pencairan Dana</h2>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID Pencairan
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mitra
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingPayouts && pendingPayouts.length > 0 ? (
                  pendingPayouts.map((payout) => (
                    <tr key={payout.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{payout.id}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{payout.partnerName}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">Rp {payout.amount.toLocaleString('id-ID')}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                            payout.status === 'APPROVED' ? 'text-green-900' :
                            payout.status === 'REJECTED' ? 'text-red-900' :
                            'text-yellow-900'
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 opacity-50 rounded-full ${
                              payout.status === 'APPROVED' ? 'bg-green-200' :
                              payout.status === 'REJECTED' ? 'bg-red-200' :
                              'bg-yellow-200'
                            }`}
                          ></span>
                          <span className="relative">{payout.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {payout.status === 'PENDING' && (
                          <button
                            onClick={() => handleProcessPayoutClick(payout)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded-lg text-xs"
                          >
                            Proses
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center py-10">
                        <History className="w-12 h-12 text-gray-400 mb-3" />
                        <p>Tidak ada permintaan pencairan dana.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'payoutHistory' && (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">History Pencairan Dana</h2>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID Pencairan
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Partner
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tanggal Proses
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyPayouts && historyPayouts.length > 0 ? (
                  historyPayouts.map((payout) => (
                    <tr key={payout.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{payout.id}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{payout.partnerName}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">Rp {payout.amount.toLocaleString('id-ID')}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                            payout.status === 'APPROVED' ? 'text-green-900' :
                            'text-red-900'
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 opacity-50 rounded-full ${
                              payout.status === 'APPROVED' ? 'bg-green-200' :
                              'bg-red-200'
                            }`}
                          ></span>
                          <span className="relative">{payout.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{new Date(payout.processedAt).toLocaleDateString()}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center py-10">
                        <History className="w-12 h-12 text-gray-400 mb-3" />
                        <p>Tidak ada riwayat pencairan dana.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'platformRevenueHistory' && (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">History Pendapatan Platform</h2>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID Transaksi
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mitra
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jumlah Transaksi
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pendapatan Platform (10%)
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tanggal Transaksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions && transactions.length > 0 ? (
                  transactions.filter(t => t.status === 'COMPLETED').map((transaction) => (
                    <tr key={transaction.transactionID}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{transaction.transactionID}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{transaction.partnerName || 'N/A'}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">Rp {transaction.totalAmount?.toLocaleString('id-ID') || '0'}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">Rp {(transaction.totalAmount * 0.10)?.toLocaleString('id-ID') || '0'}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{new Date(transaction.transactionDate).toLocaleDateString()}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center py-10">
                        <History className="w-12 h-12 text-gray-400 mb-3" />
                        <p>Tidak ada riwayat pendapatan platform.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {selectedPayout && (
        <ProcessPayoutModal
          isOpen={isProcessModalOpen}
          onClose={() => setIsProcessModalOpen(false)}
          onConfirm={handleConfirmProcessPayout}
          payout={selectedPayout}
        />
      )}
    </>
  );
}

