import React, { useEffect, useState } from 'react';
import Card from "../../components/ui/Card";
import { MapPin, PlusCircle, Edit, Trash2, ClipboardList, Loader2 } from 'lucide-react';
import axiosInstance from '../../api/axios';

import PickupPointFormModal from '../../components/modals/PickupPointFormModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';

export default function PickupPointManagement() {
  const [pickupPoints, setPickupPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pickupPointToDelete, setPickupPointToDelete] = useState(null);

  const fetchPickupPoints = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/public/pickup-points');
      setPickupPoints(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data lokasi penjemputan. Silakan coba lagi nanti.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPickupPoints();
  }, []);

  const handleAddClick = () => {
    setSelectedPickupPoint(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (point) => {
    setSelectedPickupPoint(point);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (pointId) => {
    setPickupPointToDelete(pointId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/admin/pickup-points/${pickupPointToDelete}`);
      setPickupPoints(pickupPoints.filter(point => point.pickupPointID !== pickupPointToDelete));
      // Optionally show a success notification
    } catch (err) {
      console.error("Failed to delete pickup point:", err);
      // Optionally show an error notification
    } finally {
      setIsConfirmModalOpen(false);
      setPickupPointToDelete(null);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedPickupPoint) {
        // Edit existing pickup point
        const response = await axiosInstance.put(`/admin/pickup-points/${selectedPickupPoint.pickupPointID}`, data);
        setPickupPoints(pickupPoints.map(point =>
          point.pickupPointID === selectedPickupPoint.pickupPointID ? response.data.data : point
        ));
      } else {
        // Add new pickup point
        const response = await axiosInstance.post('/admin/pickup-points', data);
        setPickupPoints([...pickupPoints, response.data.data]);
      }
      // Optionally show a success notification
    } catch (err) {
      console.error("Failed to save pickup point:", err);
      // Optionally show an error notification
    } finally {
      setIsFormModalOpen(false);
      setSelectedPickupPoint(null);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-slate-500">
          <Loader2 className="w-12 h-12 text-gray-400 mb-3 animate-spin" />
          <p>Memuat data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-red-500">
          <ClipboardList className="w-12 h-12 mb-3" />
          <p>{error}</p>
          <button onClick={fetchPickupPoints} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Coba Lagi
          </button>
        </div>
      );
    }

    if (pickupPoints && pickupPoints.length > 0) {
      return (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b-2 border-gray-200">Nama Lokasi</th>
                <th className="p-3 border-b-2 border-gray-200">Alamat</th>
                <th className="p-3 border-b-2 border-gray-200">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pickupPoints.map((point) => (
                <tr
                  key={point.pickupPointID}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="p-3 font-medium">{point.locationName}</td>
                  <td className="p-3">{point.address}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold"
                        onClick={() => handleEditClick(point)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 text-xs font-semibold"
                        onClick={() => handleDeleteClick(point.pickupPointID)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center py-10 text-slate-500">
        <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
        <p>Tidak ada lokasi penjemputan yang ditemukan.</p>
        <p className="text-xs mt-1">Coba tambahkan lokasi penjemputan baru.</p>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <MapPin className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Lokasi Penjemputan</h1>
      </div>

      <Card className="min-h-[400px] p-4">
        <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200 pb-2">
          <h3 className="text-xl font-semibold text-slate-700">Daftar Lokasi Penjemputan</h3>
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center space-x-2"
          >
            <PlusCircle size={20} />
            <span>Tambah Lokasi</span>
          </button>
        </div>
        {renderContent()}
      </Card>

      {isFormModalOpen && (
        <PickupPointFormModal
          isOpen={isFormModalOpen}
          onClose={() => {
            setIsFormModalOpen(false)
            setSelectedPickupPoint(null)
          }}
          onSubmit={handleFormSubmit}
          initialData={selectedPickupPoint}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Apakah Anda yakin ingin menghapus lokasi penjemputan ini? Aksi ini tidak dapat dibatalkan."
      />
    </>
  );
}