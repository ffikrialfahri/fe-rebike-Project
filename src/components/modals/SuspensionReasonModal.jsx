import React, { useState } from 'react';
import Modal from './Modal';

export default function SuspensionReasonModal({ isOpen, onClose, onConfirm, currentStatus }) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const reasons = [
    'Pelanggaran Syarat & Ketentuan',
    'Aktivitas Mencurigakan',
    'Penyalahgunaan Akun',
    'Permintaan Pengguna',
    'Lain-lain',
  ];

  const handleConfirm = () => {
    const reason = selectedReason === 'Lain-lain' ? customReason : selectedReason;
    onConfirm(reason);
    setSelectedReason('');
    setCustomReason('');
  };

  if (currentStatus === 'Aktif') {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Alasan Suspend Pengguna">
        <div className="space-y-4">
          <p className="text-gray-700">Pilih alasan untuk menangguhkan pengguna:</p>
          {reasons.map((reason) => (
            <div key={reason} className="flex items-center">
              <input
                type="radio"
                id={reason}
                name="suspensionReason"
                value={reason}
                checked={selectedReason === reason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor={reason} className="ml-2 text-gray-700">
                {reason}
              </label>
            </div>
          ))}
          {selectedReason === 'Lain-lain' && (
            <div>
              <label htmlFor="customReason" className="block text-sm font-medium text-gray-700 mt-2">Alasan Lainnya:</label>
              <textarea
                id="customReason"
                rows="3"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan alasan spesifik..."
              ></textarea>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedReason || (selectedReason === 'Lain-lain' && !customReason)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Konfirmasi Suspend
            </button>
          </div>
        </div>
      </Modal>
    );
  } else {
    // Modal for unsuspend confirmation (no reason needed)
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Konfirmasi Aktifkan Pengguna">
        <p className="text-gray-700 mb-4">Apakah Anda yakin ingin mengaktifkan kembali pengguna ini?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => onConfirm('')} // Pass empty string for unsuspend reason
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Aktifkan
          </button>
        </div>
      </Modal>
    );
  }
}