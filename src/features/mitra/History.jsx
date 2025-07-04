import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Card from "../../components/ui/Card";
import { formatRupiah } from "../../lib/navigation";

export default function History() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("ALL"); // ALL, PRODUCT, ORDER, FINANCIAL

  const categories = [
    { name: "Semua", value: "ALL" },
    { name: "Produk", value: "PRODUCT" },
    { name: "Pesanan", value: "ORDER" },
    { name: "Keuangan", value: "FINANCIAL" },
  ];

  useEffect(() => {
    fetchAndProcessActivities();
  }, []); // Fetch all data once

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

      // Process Product Activities (simplified: just list existing bikes as product activities)
      allBikes.forEach((bike) => {
        processedActivities.push({
          id: `bike-${bike.bikeID}`,
          type: "PRODUCT",
          timestamp: new Date().toISOString(), // Placeholder, as no creation date is available
          description: `Motor ${bike.name} (Plat: ${bike.plateNumber}) berstatus ${bike.status}.`,
          details: bike,
        });
      });

      // Process Order Activities
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

  const filteredActivities = activeCategory === "ALL"
    ? activities
    : activities.filter((activity) => activity.type === activeCategory);

  if (loading) {
    return <p>Memuat riwayat aktivitas...</p>;
  }

  if (error) {
    return <p>Error memuat riwayat aktivitas: {error.message}</p>;
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-slate-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-slate-800">Riwayat Aktivitas</h1>
      </div>

      <Card className="mb-6">
        <div className="flex border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category.value}
              className={`py-2 px-4 -mb-px text-sm font-medium focus:outline-none ${activeCategory === category.value
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"}
              `}
              onClick={() => setActiveCategory(category.value)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Feed Log</h3>
        {filteredActivities.length === 0 ? (
          <p className="text-slate-500">Tidak ada aktivitas yang ditemukan untuk kategori ini.</p>
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