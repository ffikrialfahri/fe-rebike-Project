import Card from "../../components/ui/Card";

export default function ArmadaManagement() {
  return (
    <Card>
      <h3 className="font-semibold mb-4 text-slate-800">Garasi Anda</h3>
      <button className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm mb-4 hover:bg-teal-700 transition shadow-sm">
        + Tambah Motor Baru
      </button>
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
            <tr className="border-b border-slate-100 last:border-b-0">
              <td className="p-3 font-medium">Honda Vario 125</td>
              <td className="p-3">N 1234 ABC</td>
              <td className="p-3">Rp 75.000</td>
              <td className="p-3">
                <span className="text-green-600 font-medium">Tersedia</span>
              </td>
              <td className="p-3">
                <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 ml-2 text-xs font-semibold">
                  Hapus
                </button>
                <button className="text-gray-600 hover:text-gray-800 ml-2 text-xs font-semibold">
                  Atur Ketersediaan
                </button>
              </td>
            </tr>
            <tr className="border-b border-slate-100 last:border-b-0">
              <td className="p-3 font-medium">Yamaha NMAX</td>
              <td className="p-3">N 5678 XYZ</td>
              <td className="p-3">Rp 120.000</td>
              <td className="p-3">
                <span className="text-red-600 font-medium">Disewa</span>
              </td>
              <td className="p-3">
                <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 ml-2 text-xs font-semibold">
                  Hapus
                </button>
                <button className="text-gray-600 hover:text-gray-800 ml-2 text-xs font-semibold">
                  Atur Ketersediaan
                </button>
              </td>
            </tr>
            <tr className="border-b border-slate-100 last:border-b-0">
              <td className="p-3 font-medium">Honda Beat</td>
              <td className="p-3">N 9101 LMN</td>
              <td className="p-3">Rp 60.000</td>
              <td className="p-3">
                <span className="text-green-600 font-medium">Tersedia</span>
              </td>
              <td className="p-3">
                <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 ml-2 text-xs font-semibold">
                  Hapus
                </button>
                <button className="text-gray-600 hover:text-gray-800 ml-2 text-xs font-semibold">
                  Atur Ketersediaan
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
