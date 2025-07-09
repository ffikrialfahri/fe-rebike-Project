import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function UsagePolicyFormModal({ isOpen, onClose, onSave, policy = null }) {
  const [formData, setFormData] = useState({
    policyName: '',
    description: '',
    isPermitted: false,
  });

  useEffect(() => {
    if (policy) {
      setFormData({
        policyName: policy.policyName || '',
        description: policy.description || '',
        isPermitted: policy.permitted || false, // Note: backend uses 'permitted', frontend uses 'isPermitted'
      });
    } else {
      setFormData({
        policyName: '',
        description: '',
        isPermitted: false,
      });
    }
  }, [policy, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{policy ? 'Edit Kebijakan Penggunaan' : 'Tambah Kebijakan Baru'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="policyName" className="block text-sm font-medium text-gray-700">Nama Kebijakan</label>
            <input
              type="text"
              id="policyName"
              name="policyName"
              value={formData.policyName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPermitted"
              name="isPermitted"
              checked={formData.isPermitted}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="isPermitted" className="ml-2 block text-sm text-gray-900">Diizinkan (Kebijakan Positif)</label>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
