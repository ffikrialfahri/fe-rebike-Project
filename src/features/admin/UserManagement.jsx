import { fetchUsers, suspendUser } from '../../store/admin/adminSlice';
import { Users, UserRoundX, Hand } from 'lucide-react';
import ResourceTable from '../../components/shared/ResourceTable';
import Card from "../../components/ui/Card";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import SuspensionReasonModal from '../../components/modals/SuspensionReasonModal';

export default function UserManagement() {
  const dispatch = useDispatch();
  const [isSuspensionModalOpen, setIsSuspensionModalOpen] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState(null);

  const handleSuspendUser = (user) => {
    setUserToSuspend(user);
    setIsSuspensionModalOpen(true);
  };

  const handleUnsuspendUser = async (user) => {
    await dispatch(suspendUser({ userId: user.userID, isSuspend: false, reason: "" }));
    dispatch(fetchUsers({ page: 0, size: 20 })); // Re-fetch users after successful unsuspend
  };

  const confirmSuspension = async (reason) => {
    if (userToSuspend) {
      await dispatch(suspendUser({ userId: userToSuspend.userID, isSuspend: true, reason }));
      dispatch(fetchUsers({ page: 0, size: 20 })); // Re-fetch users after successful suspend
      setIsSuspensionModalOpen(false);
      setUserToSuspend(null);
    }
  };

  const closeSuspensionModal = () => {
    setIsSuspensionModalOpen(false);
    setUserToSuspend(null);
  };

  const columns = [
    { header: 'ID', accessor: (item) => item.userID },
    { header: 'Nama', accessor: (item) => `${item.firstName} ${item.lastName}` },
    { header: 'Email', accessor: (item) => item.email },
    { header: 'Nomor Telepon', accessor: (item) => item.phoneNumber },
    {
        header: 'Status',
        accessor: (item) => item.nonLocked ? 'Aktif' : 'Suspended',
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
    },
    {
        header: 'Aksi',
        cell: (item) => (
          <div className="flex items-center space-x-4">
            {item.nonLocked ? (
              <button
                onClick={() => handleSuspendUser(item)}
                className="text-red-600 hover:text-red-800"
                title="Suspend Pengguna"
              >
                <UserRoundX size={20} />
              </button>
            ) : (
              <button
                onClick={() => handleUnsuspendUser(item)}
                className="text-green-600 hover:text-green-800"
                title="Aktifkan Pengguna"
              >
                <Hand size={20} />
              </button>
            )}
          </div>
        ),
        accessor: (item) => item.userID, // or any unique identifier
      },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-8 h-8 text-slate-700" />
            <h1 className="text-2xl font-bold text-slate-800">Manajemen User</h1>
          </div>
        </div>

        <ResourceTable
          title="Pengguna Terdaftar"
          fetchDataAction={fetchUsers}
          dataSelector={(state) => state.admin.users}
          loadingSelector={(state) => state.admin.loading}
          errorSelector={(state) => state.admin.error}
          columns={columns}
          enableSearch={true}
          searchPlaceholder="Cari berdasarkan ID pengguna..."
          emptyMessage="Tidak ada data pengguna yang ditemukan."
        />
        
        <SuspensionReasonModal
          isOpen={isSuspensionModalOpen}
          onClose={closeSuspensionModal}
          onConfirm={confirmSuspension}
          currentStatus={userToSuspend?.nonLocked ? 'Aktif' : 'Suspended'}
        />
      </div>
    </div>
  );
}