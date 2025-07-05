import React, { useState } from 'react';
import Card from "../../components/ui/Card";
import { UserCog } from 'lucide-react';

export default function ProfileSetting() {
  const [profileData, setProfileData] = useState({
    name: "Admin Utama",
    email: "admin@rebike.com",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Logika untuk memperbarui profil admin
    alert("Profil admin berhasil diperbarui!\nNama: " + profileData.name + "\nEmail: " + profileData.email);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // Logika untuk memperbarui password admin
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("Konfirmasi password baru tidak cocok!");
      return;
    }
    alert("Password admin berhasil diperbarui!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
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
            <label className="block text-sm font-medium text-gray-700">Nama Admin</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
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
              name="currentPassword"
              value={passwordData.currentPassword}
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