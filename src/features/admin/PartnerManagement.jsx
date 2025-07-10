import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPartners } from "../../store/admin/adminSlice";
import { Users } from 'lucide-react';
import axios from "../../api/axios";
import EditPartnerModal from "../../components/modals/EditPartnerModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import ResourceTable from "../../components/shared/ResourceTable";

export default function UserManajement() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [partnerToBlock, setPartnerToBlock] = useState(null);

  const handleEditClick = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPartner(null);
    // ResourceTable will handle refetching data after modal closes
  };

  const handleBlockClick = (partnerId) => {
    setPartnerToBlock(partnerId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmBlock = async () => {
    try {
      await axios.patch(`/admin/partners/${partnerToBlock}/verify`, { isVerified: false });
      // ResourceTable will handle refetching data after block
      alert("Mitra berhasil diblokir!");
    } catch (err) {
      console.error("Error blocking partner:", err);
      alert("Gagal memblokir mitra.");
    } finally {
      setIsConfirmModalOpen(false);
      setPartnerToBlock(null);
    }
  };

  const columns = [
    { header: 'ID', accessor: (item) => item.id },
    { header: 'Nama Mitra', accessor: (item) => item.name },
    { header: 'Email', accessor: (item) => item.email },
    {
      header: 'Status Verifikasi',
      cell: (item) => (
        <span
          className={
            item?.verified
              ? "text-green-600 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {item?.verified ? "Terverifikasi" : "Belum Terverifikasi"}
        </span>
      ),
      accessor: (item) => item.verified,
    },
    {
      header: 'Aksi',
      cell: (item) => (
        <div className="flex items-center space-x-2">
          <button
            className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
            onClick={() => handleEditClick(item)}
          >
            Edit
          </button>
          <button
            className="text-red-600 hover:text-red-800 text-xs font-semibold"
            onClick={() => handleBlockClick(item.id)}
          >
            Block
          </button>
        </div>
      ),
      accessor: (item) => item.id, // Dummy accessor for actions column
    },
  ];

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Users className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Mitra</h1>
      </div>
      <ResourceTable
        title="Daftar Partner"
        fetchDataAction={fetchPartners}
        dataSelector={(state) => state.admin.partners}
        loadingSelector={(state) => state.admin.loading}
        errorSelector={(state) => state.admin.error}
        columns={columns}
        enableSearch={true}
        searchPlaceholder="Cari ID mitra..."
        emptyMessage="Tidak ada mitra yang ditemukan."
      />

      {selectedPartner && (
        <EditPartnerModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          partnerData={selectedPartner}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmBlock}
        message="Apakah Anda yakin ingin memblokir mitra ini? Mitra yang diblokir tidak akan dapat login dan motornya tidak akan tersedia untuk disewa."
      />
    </>
  );
}