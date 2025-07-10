import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, PlusCircle, Edit, Trash2 } from 'lucide-react';
import axiosInstance from '../../api/axios';

import PickupPointFormModal from '../../components/modals/PickupPointFormModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import ResourceTable from '../../components/shared/ResourceTable';
import Card from "../../components/ui/Card";
import { fetchPickupPoints } from "../../store/admin/adminSlice";

export default function PickupPointManagement() {
  const dispatch = useDispatch();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pickupPointToDelete, setPickupPointToDelete] = useState(null);

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
      dispatch(fetchPickupPoints({})); // Refresh data after deletion
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
        await axiosInstance.put(`/admin/pickup-points/${selectedPickupPoint.pickupPointID}`, data);
      } else {
        // Add new pickup point
        await axiosInstance.post('/admin/pickup-points', data);
      }
      dispatch(fetchPickupPoints({})); // Refresh data after form submission
      // Optionally show a success notification
    } catch (err) {
      console.error("Failed to save pickup point:", err);
      // Optionally show an error notification
    } finally {
      setIsFormModalOpen(false);
      setSelectedPickupPoint(null);
    }
  };

  const columns = [
    { header: 'Nama Lokasi', accessor: (item) => item.locationName },
    { header: 'Alamat', accessor: (item) => item.address },
    {
      header: 'Aksi',
      cell: (item) => (
        <div className="flex items-center space-x-2">
          <button
            className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold"
            onClick={() => handleEditClick(item)}
          >
            <Edit size={16} />
          </button>
          <button
            className="text-red-600 hover:text-red-800 text-xs font-semibold"
            onClick={() => handleDeleteClick(item.pickupPointID)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      accessor: (item) => item.pickupPointID, // Dummy accessor for actions column
    },
  ];

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
        <ResourceTable
          title=""
          fetchDataAction={fetchPickupPoints}
          dataSelector={(state) => state.admin.pickupPoints}
          loadingSelector={(state) => state.admin.loading}
          errorSelector={(state) => state.admin.error}
          columns={columns}
          emptyMessage="Tidak ada lokasi penjemputan yang ditemukan."
          />
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