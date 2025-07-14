import { ClipboardList } from "lucide-react";
import { format } from "date-fns";
import { formatRupiah } from "../../lib/navigation";
import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";

export default function RecentBookingsTable({
  title,
  subtitle,
  transactions,
  loading,
  error,
  limit = 5,
  emptyMessage = "Belum ada aktivitas booking terbaru.",
}) {
  const transactionsArray = transactions?.data || transactions || []; // Handles both object and array structures

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
      {transactionsArray.length > 0 && !loading ? (
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer Name</th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Partner Name</th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment Status</th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Booking Status</th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {transactionsArray.slice(0, limit).map((transaction) => (
                <tr key={transaction.transactionID}>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{`${transaction.customer.firstName} ${transaction.customer.lastName}`}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{`${transaction.partner.firstName} ${transaction.partner.lastName}`}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{format(new Date(transaction.bookingDate), "dd/MM/yyyy")}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm"><StatusBadge status={transaction.paymentStatus} type="payment" /></td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm"><StatusBadge status={transaction.bookingStatus} type="booking" /></td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{formatRupiah(transaction.totalCost)}</td>
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
