import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { fetchTransactions } from '../../store/admin/adminSlice';
import ResourceTable from '../../components/shared/ResourceTable';
import { format } from 'date-fns';

const StatusBadge = ({ status, type }) => {
  const baseClasses = 'relative inline-block px-3 py-1 font-semibold leading-tight';
  const backgroundClasses = 'absolute inset-0 opacity-50 rounded-full';
  let colorClasses, background;

  if (type === 'payment') {
    switch (status) {
      case 'PAID':
        colorClasses = 'text-green-900';
        background = 'bg-green-200';
        break;
      case 'CANCELLED':
      case 'EXPIRED':
        colorClasses = 'text-red-900';
        background = 'bg-red-200';
        break;
      default:
        colorClasses = 'text-yellow-900';
        background = 'bg-yellow-200';
    }
  } else { // booking status
    switch (status) {
      case 'COMPLETED':
        colorClasses = 'text-green-900';
        background = 'bg-green-200';
        break;
      case 'CANCELLED':
        colorClasses = 'text-red-900';
        background = 'bg-red-200';
        break;
      default:
        colorClasses = 'text-yellow-900';
        background = 'bg-yellow-200';
    }
  }

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      <span aria-hidden className={`${backgroundClasses} ${background}`}></span>
      <span className="relative">{status}</span>
    </span>
  );
};

const columns = [
  { header: 'PARTNER NAME', accessor: (item) => item.partner.username },
  { header: 'CUSTOMER NAME', accessor: (item) => item.customer.username },
  { header: 'DATE', accessor: (item) => format(new Date(item.bookingDate), 'dd/MM/yyyy HH:mm') },
  { header: 'Start Date', accessor: (item) => format(new Date(item.startDate), 'dd/MM/yyyy HH:mm') },
  { header: 'End Date', accessor: (item) => format(new Date(item.endDate), 'dd/MM/yyyy HH:mm') },
  { header: 'Jumlah', accessor: (item) => `Rp ${item.totalCost.toLocaleString('id-ID')}` },
  {
    header: 'Status Pembayaran',
    cell: (item) => <StatusBadge status={item.paymentStatus} type="payment" />,
    accessor: (item) => item.paymentStatus,
  },
  {
    header: 'Status Booking',
    cell: (item) => <StatusBadge status={item.bookingStatus} type="booking" />,
    accessor: (item) => item.bookingStatus,
    isStatus: true,
  },
];

const statusOptions = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Dikonfirmasi' },
  { value: 'IN_PROGRESS', label: 'Dalam Proses' },
  { value: 'COMPLETED', label: 'Selesai' },
  { value: 'CANCELLED', label: 'Dibatalkan' },
];

export default function Transaction() {
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <ArrowRightLeft className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Transactions</h1>
      </div>
      <ResourceTable
        title="Daftar Transaksi"
        fetchDataAction={fetchTransactions}
        dataSelector={(state) => state.admin.transactions}
        loadingSelector={(state) => state.admin.loading}
        errorSelector={(state) => state.admin.error}
        columns={columns}
        enableStatusFilter={true}
        statusOptions={statusOptions}
        emptyMessage="Tidak ada transaksi yang ditemukan."
      />
    </>
  );
}
