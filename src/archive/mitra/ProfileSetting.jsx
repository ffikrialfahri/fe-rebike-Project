import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Card from "../../components/ui/Card";
import { UserCog } from 'lucide-react';

export default function ProfileSetting() {
  const [profileData, setProfileData] = useState({
    locationName: "",
  });
  const [bankData, setBankData] = useState({
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfileAndBankData();
  }, []);

  const fetchProfileAndBankData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/partner/bank-info");
      const data = response.data.data;
      setProfileData({ locationName: data.locationName || "" });
      setBankData({
        bankName: data.bankName || "",
        bankAccountName: data.bankAccountName || "",
        bankAccountNumber: data.bankAccountNumber || "",
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/partner/profile", profileData);
      alert("Profil berhasil diperbarui!");
    } catch (err) {
      alert("Gagal memperbarui profil: " + err.message);
    }
  };

  const handleUpdateBankInfo = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/partner/bank-info", bankData);
      alert("Informasi bank berhasil diperbarui!");
    } catch (err) {
      alert("Gagal memperbarui informasi bank: " + err.message);
    }
  };

  if (loading) {
    return <p>Memuat pengaturan profil...</p>;
  }

  if (error) {
    return <p>Error memuat pengaturan profil: {error.message}</p>;
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-10 pt-10">
        <UserCog className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Pengaturan Profil</h1>
      </div>

      <Card className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b border-gray-200 pb-2">Informasi Profil</h3>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lokasi</label>
            <input
              type="text"
              name="locationName"
              value={profileData.locationName}
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

      <Card className="p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b border-gray-200 pb-2">Informasi Bank</h3>
        <form onSubmit={handleUpdateBankInfo} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Bank</label>
            <input
              type="text"
              name="bankName"
              value={bankData.bankName}
              onChange={handleBankChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Pemilik Rekening</label>
            <input
              type="text"
              name="bankAccountName"
              value={bankData.bankAccountName}
              onChange={handleBankChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nomor Rekening</label>
            <input
              type="text"
              name="bankAccountNumber"
              value={bankData.bankAccountNumber}
              onChange={handleBankChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Perbarui Informasi Bank
          </button>
        </form>
      </Card>
    </>
  );
}