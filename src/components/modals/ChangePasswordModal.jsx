import React, { useState } from 'react';
import Modal from './Modal'; // Assuming you have a generic Modal component
import toast from 'react-hot-toast';
import axios from '../../api/axios';

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Konfirmasi password baru tidak cocok.');
      return;
    }

    try {
      await axios.patch('/user/password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });
      toast.success('Password berhasil diubah!');
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      onClose(); // Close modal on success
    } catch (err) {
      toast.error(`Gagal mengubah password: ${err.response?.data?.message || err.message || err}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ganti Password">
      <form onSubmit={handleSubmitPassword} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Password Lama</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password Baru</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Ganti Password
          </button>
        </div>
      </form>
    </Modal>
  );
}