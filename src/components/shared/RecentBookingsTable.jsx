import { ClipboardList } from "lucide-react";
import { formatRupiah } from "../../lib/navigation";
import Card from "../ui/Card";

export default function RecentBookingsTable({
  title,
  subtitle,
  transactions,
  loading,
  error,
  limit = 5,
  emptyMessage = "Belum ada aktivitas booking terbaru.",
}) {
  const transactionsArray = transactions?.data || []; // Extract the actual array

  if (loading) {
    return (
      <Card className="min-h-[400px] p-4">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p>{subtitle}</p>
        <div className="flex items-center justify-center h-full">
          <p>Loading activities...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="min-h-[400px] p-4">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p>{subtitle}</p>
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="min-h-[400px] p-4">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      {subtitle}
      {transactionsArray.length > 0 ? (
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">ID Booking</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Payment Status</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Booking Status</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {transactionsArray.slice(0, limit).map((transaction) => (
                <tr key={transaction.transactionID}>
                  <td className="py-2 px-4 border-b">{transaction.transactionID}</td>
                  <td className="py-2 px-4 border-b">{transaction.paymentStatus}</td>
                  <td className="py-2 px-4 border-b">{transaction.bookingStatus}</td>
                  <td className="py-2 px-4 border-b">{formatRupiah(transaction.totalCost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
          <p>{emptyMessage}</p>
        </div>
      )}
    </Card>
  );
}
