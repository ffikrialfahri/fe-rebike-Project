import Card from "../../components/ui/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBikesRequest } from "../../store/mitra/mitraSlice";

export default function ArmadaManagement() {
  const dispatch = useDispatch();
  const { bikes, loading, error } = useSelector((state) => state.mitra);

  useEffect(() => {
    dispatch(fetchBikesRequest());
  }, [dispatch]);

  return (
    <Card>
      <h3 className="font-semibold mb-4 text-slate-800">Garasi Anda</h3>
      <button className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm mb-4 hover:bg-teal-700 transition shadow-sm">
        + Tambah Motor Baru
      </button>

      {loading && <p>Loading armada...</p>}
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
                  <td className="p-3">{bike.plateNumber || "N/A"}</td>{" "}
                  {/* Assuming plateNumber is available */}
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
  );
}
