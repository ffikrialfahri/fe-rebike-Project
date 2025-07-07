import React, { useState, useEffect } from 'react';

export default function UpdateFeeModal({ isOpen, onClose, onConfirm, currentFee }) {
  const [newFee, setNewFee] = useState(currentFee);

  useEffect(() => {
    setNewFee(currentFee);
  }, [currentFee]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirm(parseFloat(newFee));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
        <h2 className="text-lg font-bold mb-4">Update Biaya Platform</h2>
        <div className="mb-4">
          <label htmlFor="newFee" className="block text-sm font-medium text-gray-700">Biaya Platform Baru (%):</label>
          <input
            type="number"
            id="newFee"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={newFee}
            onChange={(e) => setNewFee(e.target.value)}
            min="0"
            max="100"
            step="0.1"
          />
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
}