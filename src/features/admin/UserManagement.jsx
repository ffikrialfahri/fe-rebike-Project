import Card from "../../components/ui/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartnersRequest } from "../../store/admin/adminSlice";

export default function UserManagement() {
  const dispatch = useDispatch();
  const { partners, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchPartnersRequest());
  }, [dispatch]);

  return (
    <Card>
      <h3 className="font-semibold mb-4 text-slate-800">Daftar Mitra</h3>

      {loading && <p>Loading mitra...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3">Nama Rental</th>
                <th className="p-3">Email</th>
                <th className="p-3">Total Motor</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr
                  key={partner.id}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="p-3 font-medium">{partner.locationName}</td>
                  <td className="p-3">{partner.email}</td>
                  <td className="p-3">{partner.totalBikes}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        partner.isVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {partner.isVerified
                        ? "Terverifikasi"
                        : "Menunggu Verifikasi"}
                    </span>
                  </td>
                  <td className="p-3">
                    {!partner.isVerified ? (
                      <button className="text-teal-600 hover:text-teal-800 text-xs font-semibold">
                        Verifikasi
                      </button>
                    ) : (
                      <button className="text-red-600 hover:text-red-800 text-xs font-semibold">
                        Blokir
                      </button>
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
