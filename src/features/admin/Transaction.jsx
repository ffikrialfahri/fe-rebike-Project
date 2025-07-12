import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightLeft, ArrowLeft } from 'lucide-react';
import { fetchTransactions, fetchPartners } from '../../store/admin/adminSlice';
import ResourceTable from '../../components/shared/ResourceTable';
import { format } from 'date-fns';
import Card from '../../components/ui/Card';

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

const allTransactionsColumns = [
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
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('allTransactions');
  const [selectedPartner, setSelectedPartner] = useState(null);

  const transactionsData = useSelector((state) => state.admin.transactions || []);
  const partnersData = useSelector((state) => state.admin.partners || []);
  const loadingTransactions = useSelector((state) => state.admin.transactionsLoading);
  const loadingPartners = useSelector((state) => state.admin.loading);
  const error = useSelector((state) => state.admin.error);

  useEffect(() => {
    // Fetch transactions initially
    dispatch(fetchTransactions({}));
  }, [dispatch]);

  useEffect(() => {
    // Fetch partners only when the detail tab is active
    if (activeTab === 'byPartner') {
      dispatch(fetchPartners({}));
    }
  }, [dispatch, activeTab]);

  const handleSelectPartner = (partner) => {
    setSelectedPartner(partner);
  };

  const handleBackToPartnerList = () => {
    setSelectedPartner(null);
  };

  const partnerColumns = [
    { header: 'ID Partner', accessor: (item) => item.id, searchable: true },
    { header: 'Nama Partner', accessor: (item) => item.name },
    { header: 'Email', accessor: (item) => item.email },
    {
      header: 'Aksi',
      cell: (item) => (
        <button
          onClick={() => handleSelectPartner(item)}
          className="text-brand-primary hover:underline"
        >
          Lihat Transaksi
        </button>
      ),
    },
  ];

  const renderAllTransactions = () => (
    <ResourceTable
      title="Daftar Transaksi"
      fetchDataAction={fetchTransactions}
      dataSelector={(state) => state.admin.transactions}
      loadingSelector={(state) => state.admin.transactionsLoading}
      errorSelector={(state) => state.admin.error}
      columns={allTransactionsColumns}
      enableStatusFilter={true}
      statusOptions={statusOptions}
      emptyMessage="Tidak ada transaksi yang ditemukan."
    />
  );

  const renderPartnerDetails = () => {
    if (selectedPartner) {
      const partnerTransactions = transactionsData.filter(
        (tx) => tx.partner.partnerId === selectedPartner.id
      );
      return (
        <div>
          <button
            onClick={handleBackToPartnerList}
            className="flex items-center gap-2 mb-4 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft size={20} />
            Kembali ke Daftar Partner
          </button>
          <ResourceTable
            title={`Transaksi untuk ${selectedPartner.name}`}
            dataSelector={() => partnerTransactions}
            loadingSelector={() => loadingTransactions}
            errorSelector={() => error}
            columns={allTransactionsColumns}
            clientSidePagination={true}
            enableStatusFilter={true}
            statusOptions={statusOptions}
            emptyMessage="Tidak ada transaksi untuk partner ini."
          />
        </div>
      );
    }

    return (
      <Card>
        <h2 className="text-xl font-semibold p-4">Daftar Partner</h2>
        <ResourceTable
          title=""
          fetchDataAction={fetchPartners}
          dataSelector={(state) => state.admin.partners}
          loadingSelector={(state) => state.admin.loading}
          errorSelector={(state) => state.admin.error}
          columns={partnerColumns}
          enableSearch={true}
          searchPlaceholder="Cari nama partner..."
          emptyMessage="Tidak ada partner ditemukan."
        />
      </Card>
    );
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <ArrowRightLeft className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Transactions</h1>
      </div>

      <div className="mb-6 border-b border-slate-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('allTransactions')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'allTransactions'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Semua Transaksi
          </button>
          <button
            onClick={() => setActiveTab('byPartner')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'byPartner'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Detail Partner Transactions
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'allTransactions' ? renderAllTransactions() : renderPartnerDetails()}
      </div>
    </>
  );
}
