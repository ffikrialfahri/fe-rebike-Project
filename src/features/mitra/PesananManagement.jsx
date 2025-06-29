import Card from "../../components/ui/Card";

export default function PesananManagement() {
  return (
    <Card>
      <h3 className="font-semibold mb-4 text-slate-800">
        Daftar Semua Pesanan
      </h3>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Pelanggan</th>
              <th className="p-3">Motor</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Status</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 last:border-b-0">
              <td className="p-3">#1234</td>
              <td className="p-3">Budi Santoso</td>
              <td className="p-3">Honda Vario</td>
              <td className="p-3">28 Jun - 30 Jun</td>
              <td className="p-3">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Baru
                </span>
              </td>
              <td className="p-3">
                <button className="text-teal-600 hover:text-teal-800 text-xs font-semibold">
                  Terima
                </button>
                <button className="text-red-600 hover:text-red-800 ml-2 text-xs font-semibold">
                  Tolak
                </button>
                <button className="text-blue-600 hover:text-blue-800 ml-2 text-xs font-semibold">
                  Detail
                </button>
              </td>
            </tr>
            <tr className="border-b border-slate-100 last:border-b-0">
              <td className="p-3">#1233</td>
              <td className="p-3">Citra Lestari</td>
              <td className="p-3">Yamaha NMAX</td>
              <td className="p-3">25 Jun - 26 Jun</td>
              <td className="p-3">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Selesai
                </span>
              </td>
              <td className="p-3">
                <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold">
                  Detail
                </button>
              </td>
            </tr>
            <tr className="border-b border-slate-100 last:border-b-0">
              <td className="p-3">#1232</td>
              <td className="p-3">Ahmad Dani</td>
              <td className="p-3">Honda Beat</td>
              <td className="p-3">20 Jun - 23 Jun</td>
              <td className="p-3">
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Ditolak
                </span>
              </td>
              <td className="p-3">
                <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold">
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
