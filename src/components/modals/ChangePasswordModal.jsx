import React, { useEffect } from 'react';
import Modal from './Modal';
import toast from 'react-hot-toast';
import axios from '../../api/axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  oldPassword: yup.string().required('Password lama wajib diisi'),
  newPassword: yup.string().min(8, 'Password baru minimal 8 karakter').required('Password baru wajib diisi'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Konfirmasi password baru tidak cocok')
    .required('Konfirmasi password baru wajib diisi'),
});

export default function ChangePasswordModal({ isOpen, onClose }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isOpen) {
      reset(); // Reset form fields when modal closes
    }
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.patch('/user/password', {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      toast.success('Password berhasil diubah!');
      onClose(); // Close modal on success
    } catch (err) {
      toast.error(`Gagal mengubah password: ${err.response?.data?.message || err.message || err}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ganti Password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Password Lama</label>
          <input
            type="password"
            name="oldPassword"
            {...register('oldPassword')}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.oldPassword && <p className="text-red-500 text-xs mt-1">{errors.oldPassword.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password Baru</label>
          <input
            type="password"
            name="newPassword"
            {...register('newPassword')}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
          <input
            type="password"
            name="confirmPassword"
            {...register('confirmPassword')}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
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