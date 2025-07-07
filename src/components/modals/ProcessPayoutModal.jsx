import React, { useState } from 'react';

export default function ProcessPayoutModal({ isOpen, onClose, onConfirm, payout }) {
  const [status, setStatus] = useState('APPROVED');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirm(payout.id, status, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">Proses Pencairan Dana</h2>
        {payout && (
          <div className="mb-4 text-sm text-gray-700">
            <p><strong>ID Pencairan:</strong> {payout.id}</p>
            <p><strong>Mitra:</strong> {payout.partnerName}</p>
            <p><strong>Jumlah:</strong> Rp {payout.amount.toLocaleString('id-ID')}</p>
            <p><strong>Detail Bank:</strong> {payout.bankDetailsSnapshot}</p>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            id="status"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="APPROVED">Setujui</option>
            <option value="REJECTED">Tolak</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Catatan (Opsional):</label>
          <textarea
            id="notes"
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Proses
          </button>
        </div>
      </div>
    </div>
  );
}