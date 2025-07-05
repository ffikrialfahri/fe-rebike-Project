import Card from "../../components/ui/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartners } from "../../store/admin/adminSlice";
import { Users, ClipboardList } from 'lucide-react';

export default function UserManajement() {
  const dispatch = useDispatch();
  const { bikes, loading, error } = useSelector((state) => state.mitra);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  return (
    <>
      {/* Header Manajemen Product */}
      <div className="flex items-center gap-4 mb-6">
        <Users className="w-8 h-8 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Product</h1>
      </div>

      <Card className="mb-6 min-h-[200px] flex items-center justify-center bg-slate-100"> 
        <p className="text-slate-500">Area untuk Form Tambah/Edit Produk</p>
      </Card>

      <Card className="min-h-[400px] flex items-center justify-center bg-slate-100"> 
        <p className="text-slate-500">Area untuk Tabel Manajemen Produk</p>
        {!loading && !error && bikes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-500">
            <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
            <p>Tidak ada motor yang ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b-2 border-gray-200">Motor</th>
                  <th className="p-3 border-b-2 border-gray-200">Plat No.</th>
                  <th className="p-3 border-b-2 border-gray-200">Harga/hari</th>
                  <th className="p-3 border-b-2 border-gray-200">Status</th>
                  <th className="p-3 border-b-2 border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((bike) => (
                  <tr
                    key={bike.bikeID}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="p-3 font-medium">{bike.name}</td>
                    <td className="p-3">{bike.plateNumber || "N/A"}</td>
                    <td className="p-3">
                      Rp {bike.weekdayPricePerDay.toLocaleString("id-ID")}
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          bike.status === "AVAILABLE"
                            ? "text-green-600 font-medium"
                            : "text-red-600 font-medium"
                        }
                      >
                        {bike.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 ml-2 text-xs font-semibold">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
