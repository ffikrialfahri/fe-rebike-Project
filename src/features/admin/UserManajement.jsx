import Card from "../../components/ui/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartners } from "../../store/admin/adminSlice";
import { Users, ClipboardList, Search } from 'lucide-react';
import axios from "../../api/axios";
import EditPartnerModal from "../../components/modals/EditPartnerModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";

export default function UserManajement() {
  const dispatch = useDispatch();
  const { partners, loading, error } = useSelector((state) => state.admin);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [partnerToBlock, setPartnerToBlock] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  const handleVerifyPartner = async (partnerId) => {
    try {
      await axios.post(`/admin/partners/${partnerId}/verify`, { isVerified: true });
      dispatch(fetchPartners({ name: debouncedSearchQuery })); // Refresh data setelah verifikasi
      alert("Partner berhasil diverifikasi!");
    } catch (err) {
      console.error("Error verifying partner:", err);
      alert("Gagal memverifikasi partner.");
    }
  };

  const handleEditClick = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPartner(null);
    dispatch(fetchPartners({ name: debouncedSearchQuery })); // Refresh data setelah modal ditutup
  };

  const handleBlockClick = (partnerId) => {
    setPartnerToBlock(partnerId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmBlock = async () => {
    try {
      await axios.patch(`/admin/partners/${partnerToBlock}/verify`, { isVerified: false });
      dispatch(fetchPartners({ name: debouncedSearchQuery }));
      alert("Mitra berhasil diblokir!");
    } catch (err) {
      console.error("Error blocking partner:", err);
      alert("Gagal memblokir mitra.");
    } finally {
      setIsConfirmModalOpen(false);
      setPartnerToBlock(null);
    }
  };

  useEffect(() => {
    dispatch(fetchPartners({ name: debouncedSearchQuery }));
  }, [dispatch, debouncedSearchQuery]);

  const handleSearch = () => {
    dispatch(fetchPartners({ name: searchQuery }));
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Users className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Mitra</h1>
      </div>
      <div className="flex justify-end items-center space-x-2 p-4 w-full">
        <input
          type="text"
          placeholder="Cari nama mitra..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center space-x-2"
        >
          <Search size={20} />
          <span>Cari</span>
        </button>
      </div>

      <Card className="min-h-[400px] p-4"> 
        <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b-2 border-gray-200 pb-2">
          Daftar Mitra
        </h3>
        {loading ? (
          <p>Memuat data mitra...</p>
        ) : error ? (
          <p>Error memuat data mitra: {error.message}</p>
        ) : !partners || partners.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-500">
            <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
            <p>Tidak ada mitra yang ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b-2 border-gray-200">Nama Mitra</th>
                  <th className="p-3 border-b-2 border-gray-200">Email</th>
                  
                  <th className="p-3 border-b-2 border-gray-200">Status Verifikasi</th>
                  <th className="p-3 border-b-2 border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                  <tr
                    key={partner.id}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="p-3 font-medium">{partner.name || ''}</td>
                    <td className="p-3">{partner.email || ''}</td>
                    
                    <td className="p-3">
                      <span
                        className={
                          partner?.verified
                            ? "text-green-600 font-medium"
                            : "text-red-600 font-medium"
                        }
                      >
                        {partner?.verified ? "Terverifikasi" : "Belum Terverifikasi"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                      
                        <button
                          className="text-red-600 hover:text-red-800 text-xs font-semibold"
                          onClick={() => handleBlockClick(partner.id)}
                        >
                          Block
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

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
