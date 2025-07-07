import React, { useState, useEffect } from 'react';
import Card from "../../components/ui/Card";
import { UserCog } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, changeUserPassword } from '../../store/admin/adminSlice';
import toast from 'react-hot-toast';

export default function ProfileSetting() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Asumsi data user ada di state.auth.user
  const { loading, error } = useSelector((state) => state.admin); // Untuk loading/error dari thunk admin

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    file: null,
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        phoneNumber: user.phoneNumber || '',
        file: null,
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setProfileData((prevData) => ({
        ...prevData,
        file: files[0],
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(profileData)).unwrap();
      toast.success('Profil berhasil diperbarui!');
    } catch (err) {
      toast.error(`Gagal memperbarui profil: ${err.message || err}`);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("Konfirmasi password baru tidak cocok!");
      return;
    }
    try {
      await dispatch(changeUserPassword(passwordData)).unwrap();
      toast.success('Password berhasil diperbarui!');
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      toast.error(`Gagal memperbarui password: ${err.message || err}`);
    }
  };

  return (
    <>
      {/* Header Setting Account */}
      <div className="flex items-center gap-4 mb-6">
        <UserCog className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Pengaturan Akun</h1>
      </div>
      {/* Informasi Profil Admin */}
      <Card className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b border-gray-200 pb-2">Informasi Profil</h3>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Depan</label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Belakang</label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Foto Profil</label>
            <input
              type="file"
              name="file"
              onChange={handleProfileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Perbarui Profil
          </button>
        </form>
      </Card>
      {/* Ubah Password Admin */}
      <Card className="p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b border-gray-200 pb-2">Ubah Password</h3>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Password Saat Ini</label>
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
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Perbarui Password
          </button>
        </form>
      </Card>
    </>
  );
}
