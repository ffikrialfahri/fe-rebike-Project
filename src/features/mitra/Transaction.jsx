import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { fetchTransactions } from '../../store/mitra/mitraSlice'; // Updated import
import ResourceTable from '../../components/shared/ResourceTable';
import { format } from 'date-fns';
import { formatRupiah } from '../../lib/navigation';

const StatusBadge = ({ status }) => {
  let colorClasses, background;
  switch (status) {
    case 'COMPLETED':
    case 'PAID': // Assuming PAID is a possible status to show as green
      colorClasses = 'text-green-900';
      background = 'bg-green-200';
      break;
    case 'CANCELLED':
      colorClasses = 'text-red-900';
      background = 'bg-red-200';
      break;
    default: // PENDING, IN_PROGRESS, etc.
      colorClasses = 'text-yellow-900';
      background = 'bg-yellow-200';
  }

  return (
    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${colorClasses}`}>
      <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${background}`}></span>
      <span className="relative">{status}</span>
    </span>
  );
};

const columns = [
  { header: 'ID Transaksi', accessor: (item) => item.transactionID },
  { header: 'Motor', accessor: (item) => item.bike.name },
  { header: 'Penyewa', accessor: (item) => `${item.customer.firstName} ${item.customer.lastName}` },
  { header: 'Tanggal Sewa', accessor: (item) => format(new Date(item.startDate), 'dd/MM/yyyy') },
  { header: 'Tanggal Kembali', accessor: (item) => format(new Date(item.endDate), 'dd/MM/yyyy') },
  { header: 'Total Harga', accessor: (item) => formatRupiah(item.totalCost) },
  {
    header: 'Status',
    cell: (item) => <StatusBadge status={item.bookingStatus} />,
    accessor: (item) => item.bookingStatus,
    isStatus: true, // Mark this as the column to be used for status filtering
  },
];

const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "CONFIRMED", label: "Dikonfirmasi" },
    { value: "COMPLETED", label: "Selesai" },
    { value: "CANCELLED", label: "Dibatalkan" },
];

export default function Transaction() {
  return (
    <>
      <div className="flex items-center gap-5 mb-10 pt-10">
        <ArrowRightLeft className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Transaksi</h1>
      </div>
      <ResourceTable
        title="Daftar Transaksi"
        fetchDataAction={fetchTransactions}
        dataSelector={(state) => state.mitra.transactions}
        loadingSelector={(state) => state.mitra.loading}
        errorSelector={(state) => state.mitra.error}
        columns={columns}
        enableStatusFilter={true}
        statusOptions={statusOptions}
        initialStatus="Semua" // Changed from "ALL" to "Semua" to match ResourceTable's default filter bypass
        emptyMessage="Tidak ada transaksi yang ditemukan untuk status ini."
      />
    </>
  );
}
