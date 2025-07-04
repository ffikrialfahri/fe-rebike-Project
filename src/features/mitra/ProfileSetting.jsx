import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Card from "../../components/ui/Card";

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
      <div className="flex items-center gap-2 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-slate-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 18H7.5m-3-6h15m-1.5 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0" 
          />
        </svg>
        <h1 className="text-3xl font-bold text-slate-800">Pengaturan Profil</h1>
      </div>

      <Card className="mb-6">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Informasi Profil</h3>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lokasi</label>
            <input
              type="text"
              name="locationName"
              value={profileData.locationName}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Perbarui Profil
          </button>
        </form>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Informasi Bank</h3>
        <form onSubmit={handleUpdateBankInfo} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Bank</label>
            <input
              type="text"
              name="bankName"
              value={bankData.bankName}
              onChange={handleBankChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Perbarui Informasi Bank
          </button>
        </form>
      </Card>
    </>
  );
}