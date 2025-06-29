import Card from "../../components/ui/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionsRequest } from "../../store/mitra/mitraSlice";

export default function PesananManagement() {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.mitra);

  useEffect(() => {
    dispatch(fetchTransactionsRequest());
  }, [dispatch]);

  const getStatusChip = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <Card>
      <h3 className="font-semibold mb-4 text-slate-800">
        Daftar Semua Pesanan
      </h3>

      {loading && <p>Loading pesanan...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Pelanggan</th>
                <th className="p-3">Motor</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr
                  key={trx.transactionID}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="p-3">#{trx.transactionID.substring(0, 6)}</td>
                  <td className="p-3">
                    {trx.customer.firstName} {trx.customer.lastName}
                  </td>
                  <td className="p-3">{trx.bike.brand}</td>
                  <td className="p-3">
                    {trx.startDate} - {trx.endDate}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusChip(
                        trx.bookingStatus
                      )}`}
                    >
                      {trx.bookingStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    {trx.bookingStatus === "PENDING" && (
                      <>
                        <button className="text-teal-600 hover:text-teal-800 text-xs font-semibold">
                          Terima
                        </button>
                        <button className="text-red-600 hover:text-red-800 ml-2 text-xs font-semibold">
                          Tolak
                        </button>
                      </>
                    )}
                    <button className="text-blue-600 hover:text-blue-800 ml-2 text-xs font-semibold">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
