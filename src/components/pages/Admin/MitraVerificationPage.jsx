import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import Card from "../../ui/Card";
import { CheckCircle, XCircle, Search, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function MitraVerificationPage() {
  const [unverifiedPartners, setUnverifiedPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUnverifiedPartners = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/admin/partners");
      const filteredPartners = response.data.data.data.filter(
        (partner) => !partner.verified
      );
      setUnverifiedPartners(filteredPartners);
    } catch (err) {
      setError(err);
      toast.error("Gagal memuat data mitra.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnverifiedPartners();
  }, []);

  const handleVerifyPartner = async (partnerId) => {
    try {
      await axios.patch(`/admin/partners/${partnerId}/verify`, { isVerified: true });
      toast.success("Mitra berhasil diverifikasi!");
      fetchUnverifiedPartners(); // Refresh the list
    } catch (err) {
      toast.error("Gagal memverifikasi mitra.");
      console.error("Error verifying partner:", err);
    }
  };

  const filteredPartners = unverifiedPartners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Memuat data mitra...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-black mb-6">Verifikasi Mitra</h1>

      <Card className="p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Cari berdasarkan nama bisnis..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={fetchUnverifiedPartners}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark transition-colors"
          >
            <RefreshCcw size={20} />
            Refresh
          </button>
        </div>
      </Card>

      <Card className="p-4">
        {filteredPartners.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-slate-100 text-slate-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nama Mitra</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Telepon</th>
                  <th className="py-3 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 text-sm font-light">
                {filteredPartners.map((partner) => (
                  <tr key={partner.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{partner.name}</td>
                    <td className="py-3 px-6 text-left">{partner.email}</td>
                    <td className="py-3 px-6 text-left">{partner.phoneNumber}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleVerifyPartner(partner.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2 transition-colors"
                      >
                        <CheckCircle size={18} />
                        Verifikasi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-500">
            <p>Tidak ada mitra yang perlu diverifikasi.</p>
          </div>
        )}
      </Card>
    </div>
  );
}