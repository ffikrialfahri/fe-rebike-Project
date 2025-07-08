import React, { useEffect, useState } from 'react';
import Card from "../../components/ui/Card";
import { Users, Lightbulb, UserCheck, UserX, ClipboardList, Loader2, Search, X } from 'lucide-react';
import axiosInstance from '../../api/axios';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [isSearching, setIsSearching] = useState(false);

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

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/users');
      setUsers(response.data.data.data || []);
      setError(null);
      setIsSearching(false);
    } catch (err) {
      setError('Gagal memuat data pengguna. Silakan coba lagi nanti.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = async () => {
    if (!searchId.trim()) {
      fetchUsers();
      return;
    }
    try {
      setLoading(true);
      setIsSearching(true);
      const response = await axiosInstance.get(`/admin/users/${searchId}`);
      setUsers(response.data.data ? [response.data.data] : []);
      setError(null);
    } catch (err) {
      setError(`Pengguna dengan ID "${searchId}" tidak ditemukan.`);
      setUsers([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchId('');
    fetchUsers();
  };

  const handleToggleUserStatus = async (userId, isEnabled) => {
    try {
      await axiosInstance.patch(`/admin/users/${userId}/status`, { isEnabled: !isEnabled });
      if (isSearching) {
        handleSearch();
      } else {
        fetchUsers();
      }
    } catch (err) {
      console.error('Gagal mengubah status pengguna:', err);
      // Tampilkan notifikasi error jika perlu
    }
  };

  const renderUserTable = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-slate-500">
          <Loader2 className="w-12 h-12 text-gray-400 mb-3 animate-spin" />
          <p>Memuat data pengguna...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-red-500">
          <ClipboardList className="w-12 h-12 mb-3" />
          <p>{error}</p>
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-slate-500">
          <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
          <p>Tidak ada data pengguna yang ditemukan.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nomor Telepon</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userID}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.userID}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      {/* Jika ada photoUrl di masa depan, bisa ditambahkan di sini */}
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">
                        {user.firstName ? user.firstName.charAt(0) : ''}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap font-semibold">{user.firstName} {user.lastName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.email}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.phoneNumber}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${user.enabled ? 'text-green-900' : 'text-red-900'}`}>
                    <span aria-hidden className={`absolute inset-0 ${user.enabled ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
                    <span className="relative">{user.enabled ? 'Aktif' : 'Nonaktif'}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button 
                    onClick={() => handleToggleUserStatus(user.userID, user.enabled)}
                    className={`p-2 rounded-full hover:bg-gray-200 ${user.enabled ? 'text-red-600' : 'text-green-600'}`}
                    title={user.enabled ? 'Nonaktifkan Pengguna' : 'Aktifkan Pengguna'}
                  >
                    {user.enabled ? <UserX size={20} /> : <UserCheck size={20} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-8 h-8 text-slate-700" />
            <h1 className="text-2xl font-bold text-slate-800">Manajemen User</h1>
          </div>
        </div>

        <Card className="p-6 bg-white shadow-md rounded-lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold text-slate-700 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-500" /> Pengguna Terdaftar
            </h2>
            <div className="flex items-center gap-2">
              <input 
                type="text"
                placeholder="Cari berdasarkan ID pengguna..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button onClick={handleSearch} className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                <Search size={20} />
              </button>
              {isSearching && (
                <button onClick={handleClearSearch} className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
          {renderUserTable()}
        </Card>

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