import { fetchUsers } from '../../store/admin/adminSlice';
import { Users, Lightbulb, SquarePen, Trash2 } from 'lucide-react';
import ResourceTable from '../../components/shared/ResourceTable';
import Card from "../../components/ui/Card";

export default function UserManagement() {

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

  const columns = [
    { header: 'ID', accessor: (item) => item.userID },
    { header: 'Nama', accessor: (item) => `${item.firstName} ${item.lastName}` },
    { header: 'Email', accessor: (item) => item.email },
    { header: 'Nomor Telepon', accessor: (item) => item.phoneNumber },
    {
        header: 'Aksi',
        cell: (item) => (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => { /* Handle edit logic */ }}
              className="text-blue-600 hover:text-blue-800"
              title="Edit Pengguna"
            >
              <SquarePen size={20} />
            </button>
            <button
              onClick={() => { /* Handle delete logic */ }}
              className="text-red-600 hover:text-red-800"
              title="Hapus Pengguna"
            >
              <Trash2 size={20} />
            </button>
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
        
      </div>
    </div>
  );
}