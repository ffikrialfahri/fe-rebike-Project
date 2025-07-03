import Card from "../../components/ui/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBikes } from "../../store/mitra/mitraSlice";

export default function ArmadaManagement() {
  const dispatch = useDispatch();
  const { bikes, loading, error } = useSelector((state) => state.mitra);

  useEffect(() => {
    dispatch(fetchBikes());
  }, [dispatch]);

  return (
    <>
      {/* Header Manajemen Product */}
      <div className="flex items-center gap-2 mb-6">
        {/* SVG Icon untuk jam/dashboard, sesuai desain Figma */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-slate-700" // Ukuran dan warna icon
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Product</h1>
      </div>

      {/* Kontainer untuk Bagian Atas (Mungkin Form Tambah/Edit) */}
      <Card className="mb-6 min-h-[200px] flex items-center justify-center bg-slate-100"> {/* min-h untuk placeholder visual, bg-slate-100 untuk warna abu-abu */}
        {/* Placeholder untuk bagian atas, sesuai desain Figma */}
        <p className="text-slate-500">Area untuk Form Tambah/Edit Produk</p>
        {/* Konten Anda yang sudah ada untuk tombol "Tambah Motor Baru" */}
        {/* <button className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm mb-4 hover:bg-teal-700 transition shadow-sm">
          + Tambah Motor Baru
        </button> */}
      </Card>

      {/* Kontainer untuk Bagian Bawah (Tabel Produk) */}
      <Card className="min-h-[400px] flex items-center justify-center bg-slate-100"> {/* min-h untuk placeholder visual, bg-slate-100 untuk warna abu-abu */}
        {/* Placeholder untuk bagian bawah, sesuai desain Figma */}
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
