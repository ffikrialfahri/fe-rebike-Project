import React, { useState, useEffect } from 'react';

export default function PickupPointFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (initialData) {
      setLocationName(initialData.locationName || '');
      setAddress(initialData.address || '');
    } else {
      setLocationName('');
      setAddress('');
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ locationName, address });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">{initialData ? 'Edit' : 'Tambah'} Lokasi Penjemputan</h2>
        <div className="mb-4">
          <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">Nama Lokasi:</label>
          <input
            type="text"
            id="locationName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat:</label>
          <textarea
            id="address"
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            {initialData ? 'Update' : 'Tambah'}
          </button>
        </div>
      </div>
    </div>
  );
}