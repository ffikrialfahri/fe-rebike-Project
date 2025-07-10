import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/admin/adminSlice';
import { Users, Lightbulb, UserCheck, UserX } from 'lucide-react';
import axiosInstance from '../../api/axios';
import ResourceTable from '../../components/shared/ResourceTable';
import Card from "../../components/ui/Card";

export default function UserManagement() {
  const dispatch = useDispatch();

  // Data dummy untuk rekomendasi bisnis, bisa diganti dengan data dari API jika ada
  const businessRecommendations = [
    {
      recommendation: 'Lakukan promosi untuk pengguna baru.',
      reason: 'Pertumbuhan pengguna baru bulan ini melambat signifikan dibandingkan bulan lalu.',
      severity: 'HIGH',
    },
    {
      recommendation: 'Optimalkan harga sewa motor di akhir pekan.',
      reason: 'Tingkat pemanfaatan motor rendah pada hari Sabtu dan Minggu.',
      severity: 'MEDIUM',
    },
  ];

  const handleToggleUserStatus = async (userId, isEnabled) => {
    try {
      await axiosInstance.patch(`/admin/users/${userId}/status`, { isEnabled: !isEnabled });
      dispatch(fetchUsers({})); // Refresh data setelah perubahan status
    } catch (err) {
      console.error('Gagal mengubah status pengguna:', err);
      // Tampilkan notifikasi error jika perlu
    }
  };

  const columns = [
    { header: 'ID', accessor: (item) => item.userID },
    { header: 'Nama', accessor: (item) => `${item.firstName} ${item.lastName}` },
    { header: 'Email', accessor: (item) => item.email },
    { header: 'Nomor Telepon', accessor: (item) => item.phoneNumber },
    {
      header: 'Status',
      cell: (item) => (
        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${item.enabled ? 'text-green-900' : 'text-red-900'}`}>
          <span aria-hidden className={`absolute inset-0 ${item.enabled ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
          <span className="relative">{item.enabled ? 'Aktif' : 'Nonaktif'}</span>
        </span>
      ),
      accessor: (item) => item.enabled,
    },
    {
      header: 'Aksi',
      cell: (item) => (
        <button 
          onClick={() => handleToggleUserStatus(item.userID, item.enabled)}
          className={`p-2 rounded-full hover:bg-gray-200 ${item.enabled ? 'text-red-600' : 'text-green-600'}`}
          title={item.enabled ? 'Nonaktifkan Pengguna' : 'Aktifkan Pengguna'}
        >
          {item.enabled ? <UserX size={20} /> : <UserCheck size={20} />}
        </button>
      ),
      accessor: (item) => item.userID, // Dummy accessor for actions column
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

        <Card className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" /> Rekomendasi Bisnis
          </h2>
          <div className="overflow-x-auto">
            {businessRecommendations.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {businessRecommendations.map((rec, index) => (
                  <li key={index}>
                    <p className="font-semibold">{rec.recommendation}</p>
                    <p className="text-sm text-slate-600">Alasan: {rec.reason}</p>
                    <p className={`text-xs font-medium ${rec.severity === 'HIGH' ? 'text-red-500' : rec.severity === 'MEDIUM' ? 'text-orange-500' : 'text-green-500'}`}>
                      Prioritas: {rec.severity}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-500">
                <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
                <p>Tidak ada rekomendasi bisnis saat ini.</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}