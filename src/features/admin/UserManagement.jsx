import Card from "../../components/ui/Card";

export default function UserManagement() {
  return (
    <Card>
      <h3 className="font-semibold mb-4 text-slate-800">Daftar Mitra</h3>
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
            <tr className="border-b border-slate-100 last:border-b-0">
              <td className="p-3 font-medium">Rental Barokah</td>
              <td className="p-3">mitra@example.com</td>
              <td className="p-3">10</td>
              <td className="p-3">
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  Aktif
                </span>
              </td>
              <td className="p-3">
                <button className="text-red-600 hover:text-red-800 text-xs font-semibold">
                  Blokir
                </button>
                <button className="text-blue-600 hover:text-blue-800 ml-2 text-xs font-semibold">
                  Detail
                </button>
              </td>
            </tr>
            <tr className="border-b border-slate-100 last:border-b-0">
              <td className="p-3 font-medium">Sewa Motor Jaya</td>
              <td className="p-3">jaya@example.com</td>
              <td className="p-3">5</td>
              <td className="p-3">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  Verifikasi
                </span>
              </td>
              <td className="p-3">
                <button className="text-teal-600 hover:text-teal-800 text-xs font-semibold">
                  Verifikasi
                </button>
                <button className="text-red-600 hover:text-red-800 ml-2 text-xs font-semibold">
                  Tolak
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
