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
          searchPlaceholder="Cari ID pengguna..."
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