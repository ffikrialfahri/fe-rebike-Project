import React, { useState, useEffect } from 'react';
import Card from "../../components/ui/Card";
import { UserCog, ClipboardList } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../store/admin/adminSlice';
import toast from 'react-hot-toast';
import { getUsagePolicies, createUsagePolicy, updateUsagePolicy, deleteUsagePolicy } from '../../api/usagePoliciesApi';
import { registerAdmin } from '../../api/adminApi';
import UsagePolicyFormModal from '../../components/modals/UsagePolicyFormModal';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import RegisterAdminModal from '../../components/modals/RegisterAdminModal';

export default function ProfileSetting() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Asumsi data user ada di state.auth.user
  const { loading, error } = useSelector((state) => state.admin); // Untuk loading/error dari thunk admin

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    file: null,
  });
  const [usagePolicies, setUsagePolicies] = useState([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState(null);
  const [isRegisterAdminModalOpen, setIsRegisterAdminModalOpen] = useState(false);

  const refreshUsagePolicies = async () => {
    try {
      const policies = await getUsagePolicies();
      setUsagePolicies(policies);
    } catch (err) {
      toast.error(`Gagal memuat kebijakan penggunaan: ${err}`);
    }
  };

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        phoneNumber: user.phoneNumber || '',
        file: null,
      });
    }
    refreshUsagePolicies();
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setProfileData((prevData) => ({
        ...prevData,
        file: files[0],
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(profileData)).unwrap();
      toast.success('Profil berhasil diperbarui!');
    } catch (err) {
      toast.error(`Gagal memperbarui profil: ${err.message || err}`);
    }
  };

  const handleAddPolicyClick = () => {
    setEditingPolicy(null);
    setIsFormModalOpen(true);
  };

  const handleEditPolicyClick = (policy) => {
    setEditingPolicy(policy);
    setIsFormModalOpen(true);
  };

  const handleSavePolicy = async (policyData) => {
    try {
      if (editingPolicy) {
        await updateUsagePolicy(editingPolicy.id, policyData);
        toast.success('Kebijakan berhasil diperbarui!');
      } else {
        await createUsagePolicy(policyData);
        toast.success('Kebijakan berhasil ditambahkan!');
      }
      setIsFormModalOpen(false);
      refreshUsagePolicies();
    } catch (err) {
      toast.error(`Gagal menyimpan kebijakan: ${err}`);
    }
  };

  const handleDeletePolicyClick = (policyId) => {
    setPolicyToDelete(policyId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUsagePolicy(policyToDelete);
      toast.success('Kebijakan berhasil dihapus!');
      setIsConfirmModalOpen(false);
      refreshUsagePolicies();
    } catch (err) {
      toast.error(`Gagal menghapus kebijakan. Kebijakan ini mungkin sedang digunakan atau memiliki keterkaitan dengan data lain.`);
    }
  };

  const handleRegisterAdmin = async (adminData) => {
    try {
      await registerAdmin(adminData);
      toast.success('Admin baru berhasil didaftarkan!');
      setIsRegisterAdminModalOpen(false);
    } catch (err) {
      toast.error(`Gagal mendaftarkan admin baru: ${err}`);
    }
  };

  return (
    <>
      {/* Header Setting Account */}
      <div className="flex items-center gap-4 mb-6">
        <UserCog className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Pengaturan Akun</h1>
      </div>
      {/* Informasi Profil Admin */}
      <Card className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b border-gray-200 pb-2">Informasi Profil</h3>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Depan</label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Belakang</label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Foto Profil</label>
            <input
              type="file"
              name="file"
              onChange={handleProfileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
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

      {/* Kebijakan Penggunaan */}
      <Card className="p-6 bg-white shadow-md rounded-lg mt-6">
        <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b border-gray-200 pb-2">Kebijakan Penggunaan</h3>
        <button
          onClick={handleAddPolicyClick}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mb-4"
        >
          Tambah Kebijakan Baru
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nama Kebijakan
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Diizinkan
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {usagePolicies.length > 0 ? (
                usagePolicies.map((policy) => (
                  <tr key={policy.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{policy.policyName}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{policy.description}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{policy.permitted ? 'Ya' : 'Tidak'}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleEditPolicyClick(policy)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePolicyClick(policy.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center py-10">
                      <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
                      <p>Tidak ada kebijakan penggunaan yang ditemukan.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <UsagePolicyFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSavePolicy}
        policy={editingPolicy}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Apakah Anda yakin ingin menghapus kebijakan ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        cancelText="Batal"
      />

      {/* Manajemen Admin */}
      <Card className="p-6 bg-white shadow-md rounded-lg mt-6">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-slate-700">Manajemen Admin</h2>
          <button
            onClick={() => setIsRegisterAdminModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Tambah Admin Baru
          </button>
        </div>
        <p className="text-gray-600 mb-4">Gunakan bagian ini untuk mendaftarkan akun administrator baru ke sistem.</p>
      </Card>

      <RegisterAdminModal
        isOpen={isRegisterAdminModalOpen}
        onClose={() => setIsRegisterAdminModalOpen(false)}
        onRegister={handleRegisterAdmin}
      />
    </>
  );
}
