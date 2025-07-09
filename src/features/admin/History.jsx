import React from 'react';
import { History } from 'lucide-react';
import ResourceTable from '../../components/shared/ResourceTable';

const historyLogs = [
  { id: 1, date: '2024-07-01 10:00', type: 'Login', description: 'Pengguna John Doe berhasil login.' },
  { id: 2, date: '2024-07-01 10:30', type: 'Transaksi', description: 'Transaksi BK001 selesai.' },
  { id: 3, date: '2024-07-01 11:00', type: 'Sistem', description: 'Sistem diperbarui ke versi 2.0.' },
  { id: 4, date: '2024-07-01 11:15', type: 'Login', description: 'Pengguna Jane Smith gagal login.' },
  { id: 5, date: '2024-07-01 11:45', type: 'Transaksi', description: 'Transaksi BK002 dibatalkan.' },
];

const columns = [
  { header: 'Tanggal & Waktu', accessor: (item) => item.date },
  {
    header: 'Tipe',
    accessor: (item) => item.type,
    isStatus: true, // Use 'type' for filtering
  },
  { header: 'Deskripsi', accessor: (item) => item.description },
];

const statusOptions = [
  { value: 'Login', label: 'Login' },
  { value: 'Transaksi', label: 'Transaksi' },
  { value: 'Sistem', label: 'Sistem' },
];

export default function HistoryPage() {
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <History className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">History</h1>
      </div>
      <ResourceTable
        title="Feed Log"
        columns={columns}
        staticData={historyLogs}
        enableStatusFilter={true}
        statusOptions={statusOptions}
        initialStatus="Semua"
        emptyMessage="Tidak ada log ditemukan untuk tipe ini."
      />
    </>
  );
}
