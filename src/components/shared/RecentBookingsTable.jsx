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
      {transactions && transactions.length > 0 ? (
        <ul className="space-y-3 mt-2">
          {transactions.slice(0, limit).map((transaction) => (
            <li
              key={transaction.transactionID}
              className="p-3 bg-gray-50 rounded-md shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-slate-800">
                  Booking ID: {transaction.transactionID.substring(0, 8)}...
                </p>
                <p className="text-sm text-slate-600">
                  Status: {transaction.bookingStatus}
                </p>
              </div>
              <span className="font-semibold text-lg text-indigo-600">
                {formatRupiah(transaction.totalCost)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
          <p>{emptyMessage}</p>
        </div>
      )}
    </Card>
  );
}
