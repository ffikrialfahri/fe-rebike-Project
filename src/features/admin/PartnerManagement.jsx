import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartners, fetchUsers } from "../../store/admin/adminSlice";
import { Users, CheckCircle, Search, RefreshCcw, UserRoundX } from 'lucide-react';
import axios from "../../api/axios";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import ResourceTable from "../../components/shared/ResourceTable";
import Card from "../../components/ui/Card";
import toast from 'react-hot-toast';

export default function PartnerManagement() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('allPartners');

  const { partners, users, loading, error } = useSelector((state) => state.admin);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [partnerToBlock, setPartnerToBlock] = useState(null);

  const [unverifiedPartners, setUnverifiedPartners] = useState([]);
  const [loadingVerification, setLoadingVerification] = useState(true);
  const [errorVerification, setErrorVerification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUnverifiedPartners = async () => {
    setLoadingVerification(true);
    try {
      const response = await axios.get("/admin/partners?size=1000"); // Fetch all for client-side filtering
      const filteredPartners = response.data.data.data.filter(
        (partner) => !partner.isVerified // Backend uses isVerified
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
    } else {
      dispatch(fetchPartners({ page: 0, size: 1000 }));
      dispatch(fetchUsers({ page: 0, size: 1000 }));
    }
  }, [dispatch, activeTab]);

  const handleVerifyPartner = async (partnerId) => {
    try {
      await axios.patch(`/admin/partners/${partnerId}/verify`, { isVerified: true });
      toast.success("Partner berhasil diverifikasi!");
      fetchUnverifiedPartners(); // Refresh verification list
    } catch (err) {
      toast.error("Gagal memverifikasi partner.");
      console.error("Error verifying partner:", err);
    }
  };

  const filteredForVerification = unverifiedPartners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBlockClick = (partnerId) => {
    setPartnerToBlock(partnerId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmBlock = async () => {
    try {
      // Logic for blocking user is handled in UserManagement page now.
      // This button in partner list should probably suspend the user.
      console.log("Blocking/Suspending partner:", partnerToBlock);
      toast.info("Fungsi blokir/suspend akan diimplementasikan.");
    } catch (err) {
      toast.error("Gagal memblokir partner.");
    } finally {
      setIsConfirmModalOpen(false);
      setPartnerToBlock(null);
    }
  };

  const mergedData = useMemo(() => {
    if (!partners.length || !users.length) {
      return [];
    }
    const usersMap = new Map(users.map(user => [user.userID, user]));
    return partners.map(partner => {
      const correspondingUser = usersMap.get(partner.id);
      return {
        ...partner,
        nonLocked: correspondingUser ? correspondingUser.nonLocked : true, // Default to true if user not found
      };
    }).filter(p => usersMap.has(p.id)); // Only include partners that have a corresponding user
  }, [partners, users]);
  
  const columns = [
    { header: 'ID', accessor: (item) => item.id },
    { header: 'Nama Partner', accessor: (item) => item.name, searchable: true },
    { header: 'Email', accessor: (item) => item.email },
    {
      header: 'Status Verifikasi',
      cell: (item) => (
        <span
          className={
            item.isVerified // Backend uses isVerified
              ? "text-green-600 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {item.isVerified ? "Terverifikasi" : "Belum Terverifikasi"}
        </span>
      ),
      accessor: (item) => item.isVerified,
    },
    {
      header: 'Status Suspend',
      cell: (item) => (
        <span
          className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
            item.nonLocked ? 'text-green-900' : 'text-red-900'
          }`}
        >
          <span
            aria-hidden
            className={`absolute inset-0 opacity-50 rounded-full ${
              item.nonLocked ? 'bg-green-200' : 'bg-red-200'
            }`}
          ></span>
          <span className="relative">
            {item.nonLocked ? 'Aktif' : 'Suspended'}
          </span>
        </span>
      ),
      accessor: (item) => (item.nonLocked ? 'Aktif' : 'Suspended'),
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
            <p className="text-center py-10">Memuat data partner...</p>
        ) : errorVerification ? (
            <p className="text-center py-10 text-red-500">Error: {errorVerification.message}</p>
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
      staticData={mergedData}
      loading={loading}
      error={error}
      columns={columns}
      clientSidePagination={true}
      enableSearch={true}
      searchPlaceholder="Cari berdasarkan nama partner..."
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

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmBlock}
        message="Fungsi blokir/suspend user dilakukan di halaman Manajemen User. Apakah Anda ingin melanjutkan?"
      />
    </>
  );
}