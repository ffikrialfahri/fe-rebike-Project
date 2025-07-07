import React, { useEffect, useState } from 'react';
import Card from "../../components/ui/Card";
import { Landmark, History, CircleDollarSign } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardSummary, fetchPayouts, processPayout, fetchPlatformFee, updatePlatformFee } from '../../store/admin/adminSlice';
import ProcessPayoutModal from '../../components/modals/ProcessPayoutModal';
import UpdateFeeModal from '../../components/modals/UpdateFeeModal';

export default function Keuangan() {
  const dispatch = useDispatch();
  const { dashboardSummary, payouts, platformFee, loading, error } = useSelector((state) => state.admin);

  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
    dispatch(fetchPayouts());
    dispatch(fetchPlatformFee());
  }, [dispatch]);

  const handleProcessPayoutClick = (payout) => {
    setSelectedPayout(payout);
    setIsProcessModalOpen(true);
  };

  const handleConfirmProcessPayout = (payoutId, status, notes) => {
    dispatch(processPayout({ payoutId, status, notes }));
  };

  const handleUpdateFeeClick = () => {
    setIsFeeModalOpen(true);
  };

  const handleConfirmUpdateFee = (newFeePercentage) => {
    dispatch(updatePlatformFee(newFeePercentage));
  };

  if (loading) {
    return <p>Memuat data keuangan...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {/* Header Keuangan */}
      <div className="flex items-center gap-4 mb-6">
        <Landmark className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Keuangan</h1>
      </div>

      {/* Container for Top Section (Balance and Account Panels) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Balance Panel */}
        <Card className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Pendapatan Platform</h2>
          <p className="text-3xl font-bold text-indigo-600 mb-4">Rp {dashboardSummary?.platformRevenue?.toLocaleString('id-ID') || '0'}</p>
          {/* <button
            onClick={handleWithdraw}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Cairkan Semua Dana
          </button> */}
        </Card>
        {/* Platform Fee Panel */}
        <Card className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Biaya Platform</h2>
          <p className="text-3xl font-bold text-indigo-600 mb-4">{platformFee !== null ? `${platformFee}%` : 'Memuat...'}</p>
          <button
            onClick={handleUpdateFeeClick}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Ubah Biaya Platform
          </button>
        </Card>
      </div>

      {/* Payout Requests */}
      <Card className="p-6 bg-white shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Permintaan Pencairan Dana</h2>
        <div className="overflow-x-auto">
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
              {payouts && payouts.length > 0 ? (
                payouts.map((payout) => (
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
                      <CircleDollarSign className="w-12 h-12 text-gray-400 mb-3" />
                      <p>Tidak ada permintaan pencairan dana.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedPayout && (
        <ProcessPayoutModal
          isOpen={isProcessModalOpen}
          onClose={() => setIsProcessModalOpen(false)}
          onConfirm={handleConfirmProcessPayout}
          payout={selectedPayout}
        />
      )}

      {platformFee !== null && (
        <UpdateFeeModal
          isOpen={isFeeModalOpen}
          onClose={() => setIsFeeModalOpen(false)}
          onConfirm={handleConfirmUpdateFee}
          currentFee={platformFee}
        />
      )}
    </>
  );
}
