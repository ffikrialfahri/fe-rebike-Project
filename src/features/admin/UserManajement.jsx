import Card from "../../components/ui/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartnersRequest } from "../../store/admin/adminSlice";

export default function UserManajement() {
  const dispatch = useDispatch();
  const { bikes, loading, error } = useSelector((state) => state.mitra);

  useEffect(() => {
    dispatch(fetchPartnersRequest());
  }, [dispatch]);

  return (
    <>
      {/* Header Manajemen Product */}
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
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Product</h1>
      </div>

      <Card className="mb-6 min-h-[200px] flex items-center justify-center bg-slate-100"> 
        <p className="text-slate-500">Area untuk Form Tambah/Edit Produk</p>
      </Card>

      <Card className="min-h-[400px] flex items-center justify-center bg-slate-100"> 
        <p className="text-slate-500">Area untuk Tabel Manajemen Produk</p>
        {/* Konten tabel Anda yang sudah ada */}
        {/* {loading && <p>Loading armada...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-3">Motor</th>
                  <th className="p-3">Plat No.</th>
                  <th className="p-3">Harga/hari</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Aksi</th>
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
        )} */}
      </Card>
    </>
  );
}
