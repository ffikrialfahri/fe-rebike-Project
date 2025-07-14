import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPartners } from "../../store/admin/adminSlice";
import { Users, CheckCircle, Search, RefreshCcw, SquarePen, Trash2, UserRoundX } from 'lucide-react';
import axios from "../../api/axios";
import EditPartnerModal from "../../components/modals/EditPartnerModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import ResourceTable from "../../components/shared/ResourceTable";
import Card from "../../components/ui/Card";
import toast from 'react-hot-toast';

export default function PartnerManagement() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('allPartners'); // 'verification' or 'allPartners'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [partnerToBlock, setPartnerToBlock] = useState(null);

  // State for verification section
  const [unverifiedPartners, setUnverifiedPartners] = useState([]);
  const [loadingVerification, setLoadingVerification] = useState(true);
  const [errorVerification, setErrorVerification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch unverified partners
  const fetchUnverifiedPartners = async () => {
    setLoadingVerification(true);
    try {
      const response = await axios.get("/admin/partners");
      const filteredPartners = response.data.data.data.filter(
        (partner) => !partner.verified
      );
      setUnverifiedPartners(filteredPartners);
    } catch (err) {
      setErrorVerification(err);
      toast.error("Gagal memuat data partner untuk verifikasi.");
    } finally {
      setLoadingVerification(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'verification') {
      fetchUnverifiedPartners();
    }
  }, [activeTab]);

  // Handle verification
  const handleVerifyPartner = async (partnerId) => {
    try {
      await axios.patch(`/admin/partners/${partnerId}/verify`, { isVerified: true }, { withCredentials: true });
      toast.success("Partner berhasil diverifikasi!");
      fetchUnverifiedPartners(); // Refresh verification list
      dispatch(fetchPartners({})); // Refresh main partner list
    } catch (err) {
      toast.error("Gagal memverifikasi partner.");
      console.error("Error verifying partner:", err);
    }
  };

  // Filter for verification search
  const filteredForVerification = unverifiedPartners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers for main partner list
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPartner(null);
  };

  const handleBlockClick = (partnerId) => {
    setPartnerToBlock(partnerId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmBlock = async () => {
    try {
      await axios.patch(`/admin/partners/${partnerToBlock}/verify`, { isVerified: false });
      toast.success("Partner berhasil diblokir.");
      dispatch(fetchPartners({})); // Refresh main list
      fetchUnverifiedPartners(); // Refresh verification list
    } catch (err) {
      console.error("Error blocking partner:", err);
      toast.error("Gagal memblokir partner.");
    } finally {
      setIsConfirmModalOpen(false);
      setPartnerToBlock(null);
    }
  };

  const columns = [
    { header: 'ID', accessor: (item) => item.id },
    { header: 'Nama Partner', accessor: (item) => item.name },
    { header: 'Email', accessor: (item) => item.email },
    {
      header: 'Status',
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
        <div className="flex items-center space-x-4">
          <button
            className="text-yellow-600 hover:text-yellow-800"
            onClick={() => handleBlockClick(item.id)}
            title="Nonaktifkan Partner"
          >
            <UserRoundX size={20} />
          </button>
        </div>
      ),
      accessor: (item) => item.id,
    },
  ];

  const renderVerificationContent = () => (
    <>
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Cari berdasarkan nama bisnis..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={fetchUnverifiedPartners}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark transition-colors"
          >
            <RefreshCcw size={20} />
            Refresh
          </button>
        </div>
      </Card>
      <Card className="p-4 mb-6">
        {loadingVerification ? (
            <p>Memuat data partner...</p>
        ) : errorVerification ? (
            <p>Error: {errorVerification.message}</p>
        ) : filteredForVerification.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-slate-100 text-slate-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nama Partner</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 text-sm font-light">
                {filteredForVerification.map((partner) => (
                  <tr key={partner.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{partner.name}</td>
                    <td className="py-3 px-6 text-left">{partner.email}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleVerifyPartner(partner.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2 transition-colors"
                      >
                        <CheckCircle size={18} />
                        Verifikasi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-500">
            <p>Tidak ada partner yang perlu diverifikasi.</p>
          </div>
        )}
      </Card>
    </>
  );

  const renderAllPartnersContent = () => (
    <ResourceTable
      title="Daftar Semua Partner"
      fetchDataAction={fetchPartners}
      dataSelector={(state) => state.admin.partners}
      loadingSelector={(state) => state.admin.loading}
      errorSelector={(state) => state.admin.error}
      columns={columns}
      enableSearch={true}
      searchPlaceholder="Cari ID atau nama partner..."
      emptyMessage="Tidak ada partner yang ditemukan."
    />
  );

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Users className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Partner</h1>
      </div>

      <div className="mb-6 border-b border-slate-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('allPartners')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'allPartners'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Daftar Semua Partner
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'verification'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Verifikasi Partner
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'verification' ? renderVerificationContent() : renderAllPartnersContent()}
      </div>

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
        message="Apakah Anda yakin ingin memblokir partner ini? Partner yang diblokir tidak akan dapat login dan motornya tidak akan tersedia untuk disewa."
      />
    </>
  );
}
