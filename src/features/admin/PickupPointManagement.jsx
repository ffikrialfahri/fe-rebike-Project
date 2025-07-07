import React, { useEffect, useState } from 'react';
import Card from "../../components/ui/Card";
import { MapPin, PlusCircle, Edit, Trash2, ClipboardList } from 'lucide-react';

import PickupPointFormModal from '../../components/modals/PickupPointFormModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';

export default function PickupPointManagement() {
  const [pickupPoints, setPickupPoints] = useState([
    { pickupPointID: '1', locationName: 'Kantor Pusat Rebike', address: 'Jl. Raya Contoh No. 123, Kota Malang' },
    { pickupPointID: '2', locationName: 'Bandara Abdul Rachman Saleh', address: 'Jl. Raya Bandara, Pakis, Malang' },
    { pickupPointID: '3', locationName: 'Stasiun Malang Kota Baru', address: 'Jl. Trunojoyo No.10, Klojen, Malang' },
  ]);

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

  const handleConfirmDelete = () => {
    setPickupPoints(pickupPoints.filter(point => point.pickupPointID !== pickupPointToDelete));
    setIsConfirmModalOpen(false);
    setPickupPointToDelete(null);
  };

  const handleFormSubmit = (data) => {
    if (selectedPickupPoint) {
      setPickupPoints(pickupPoints.map(point => 
        point.pickupPointID === selectedPickupPoint.pickupPointID ? { ...point, ...data } : point
      ));
    } else {
      setPickupPoints([...pickupPoints, { pickupPointID: String(pickupPoints.length + 1), ...data }]);
    }
    setIsFormModalOpen(false);
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

        {pickupPoints && pickupPoints.length > 0 ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-slate-500">
            <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
            <p>Tidak ada lokasi penjemputan yang ditemukan.</p>
          </div>
        )}
      </Card>

      <PickupPointFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedPickupPoint}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Apakah Anda yakin ingin menghapus lokasi penjemputan ini? Aksi ini tidak dapat dibatalkan."
      />
    </>
  );
}