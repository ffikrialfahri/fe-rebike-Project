import React, { useState, useEffect, useCallback } from "react";
import axios from "../../api/axios";
import Card from "../../components/ui/Card";
import BikeFormModal from "../../components/modals/BikeFormModal";
import { formatRupiah } from "../../lib/navigation";
import { Bike, ClipboardList } from 'lucide-react';

export default function ArmadaManagement() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBike, setCurrentBike] = useState(null);

  const fetchBikes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/partner/bikes");
      let fetchedBikes = response.data?.data?.content || [];

      if (filterStatus !== "ALL") {
        fetchedBikes = fetchedBikes.filter(bike => bike.status === filterStatus);
      }

      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        fetchedBikes = fetchedBikes.filter(
          bike =>
            bike.name.toLowerCase().includes(lowerCaseQuery) ||
            bike.plateNumber.toLowerCase().includes(lowerCaseQuery)
        );
      }
      setBikes(fetchedBikes);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, searchQuery, setBikes, setLoading, setError]);

  useEffect(() => {
    fetchBikes();
  }, [fetchBikes]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleAddBike = () => {
    setCurrentBike(null);
    setIsModalOpen(true);
  };

  const handleEditBike = (bike) => {
    setCurrentBike(bike);
    setIsModalOpen(true);
  };

  const handleDeleteBike = async (bikeId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus motor ini?")) {
      try {
        await axios.delete(`/partner/bikes/${bikeId}`);
        fetchBikes();
      } catch (err) {
        alert("Gagal menghapus motor: " + err.message);
      }
    }
  };

  const handleSaveBike = async (bikeData) => {
    try {
      if (currentBike) {
        await axios.put(`/partner/bikes/${currentBike.bikeID}`, bikeData);
      } else {
        await axios.post("/partner/bikes", bikeData);
      }
      fetchBikes();
    } catch (err) {
      alert("Gagal menyimpan motor: " + err.message);
    }
  };

  if (loading) {
    return <p>Memuat data armada...</p>;
  }

  if (error) {
    return <p>Error memuat data armada: {error.message}</p>;
  }

  return (
    <>
      <div className="flex items-center gap-5 mb-10 pt-10">
        <Bike className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Armada</h1>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Cari nama motor atau plat..."
            className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select
            className="p-2 border border-gray-300 rounded-md w-full md:w-auto"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="ALL">Semua Status</option>
            <option value="AVAILABLE">Tersedia</option>
            <option value="RENTED">Disewa</option>
            <option value="INACTIVE">Perbaikan</option>
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-auto"
            onClick={handleAddBike}
          >
            Tambah Motor Baru
          </button>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Daftar Motor</h3>
        {bikes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-500">
            <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
            <p>Tidak ada motor yang ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Nama Motor</th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Plat Nomor</th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Harga Harian (Weekday)</th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Harga Harian (Weekend)</th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Status</th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((bike) => (
                  <tr key={bike.bikeID}>
                    <td className="py-2 px-4 border-b">{bike.name}</td>
                    <td className="py-2 px-4 border-b">{bike.plateNumber}</td>
                    <td className="py-2 px-4 border-b">{formatRupiah(bike.weekdayPricePerDay)}</td>
                    <td className="py-2 px-4 border-b">{formatRupiah(bike.weekendPricePerDay)}</td>
                    <td className="py-2 px-4 border-b">{bike.status}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm mr-2"
                        onClick={() => handleEditBike(bike)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                        onClick={() => handleDeleteBike(bike.bikeID)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <BikeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBike}
        bikeData={currentBike}
      />
    </>
  );
}