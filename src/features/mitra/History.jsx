import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Card from "../../components/ui/Card";
import { formatRupiah } from "../../lib/navigation";
import { History, ClipboardList } from 'lucide-react';

export default function HistoryPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("ALL");

  const logTypes = [
    { name: "Semua", value: "ALL" },
    { name: "Produk", value: "PRODUCT" },
    { name: "Pesanan", value: "ORDER" },
    { name: "Keuangan", value: "FINANCIAL" },
  ];

  useEffect(() => {
    fetchAndProcessActivities();
  }, [selectedType]);

  const fetchAndProcessActivities = async () => {
    setLoading(true);
    try {
      const [bikesRes, transactionsRes, payoutsRes] = await Promise.all([
        axios.get("/partner/bikes"),
        axios.get("/partner/transactions"),
        axios.get("/partner/payouts"),
      ]);

      const allBikes = bikesRes.data.data.data || [];
      const allTransactions = transactionsRes.data.data || [];
      const allPayouts = payoutsRes.data.data || [];

      let processedActivities = [];

      allBikes.forEach((bike) => {
        processedActivities.push({
          id: `bike-${bike.bikeID}`,
          type: "PRODUCT",
          timestamp: new Date().toISOString(),
          description: `Motor ${bike.name} (Plat: ${bike.plateNumber}) berstatus ${bike.status}.`,
          details: bike,
        });
      });

      allTransactions.forEach((transaction) => {
        processedActivities.push({
          id: `trans-${transaction.transactionID}`,
          type: "ORDER",
          timestamp: transaction.createdAt || new Date().toISOString(), // Assuming createdAt exists
          description: `Pesanan ${transaction.transactionID} untuk motor ${transaction.bikeName} berstatus ${transaction.bookingStatus}. Total: ${formatRupiah(transaction.totalPrice)}.`, 
          details: transaction,
        });
      });

      // Process Financial Activities (Payouts)
      allPayouts.forEach((payout) => {
        processedActivities.push({
          id: `payout-${payout.payoutID}`,
          type: "FINANCIAL",
          timestamp: payout.createdAt || new Date().toISOString(), // Assuming createdAt exists
          description: `Permintaan payout sebesar ${formatRupiah(payout.amount)} berstatus ${payout.status}.`,
          details: payout,
        });
      });

      // Sort activities by timestamp (newest first)
      processedActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setActivities(processedActivities);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = selectedType === "ALL"
    ? activities
    : activities.filter((activity) => activity.type === selectedType);

  if (loading) {
    return <p>Memuat riwayat aktivitas...</p>;
  }

  if (error) {
    return <p>Error memuat riwayat aktivitas: {error.message}</p>;
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-10 pt-10">
        <History className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Riwayat Aktivitas</h1>
      </div>

      <div className="flex items-center mb-5 pt-5">
        <label htmlFor="type-filter" className="mr-2 text-slate-600 text-xl font-bold">Filter Tipe:</label>
        <select
          id="type-filter"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
        >
          {logTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <Card className="mb-6 p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-slate-700">Feed Log</h2>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-500">
            <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
            <p>Tidak ada aktivitas yang ditemukan untuk kategori ini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold uppercase text-blue-600">{activity.type}</span>
                  <span className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-gray-800">{activity.description}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}