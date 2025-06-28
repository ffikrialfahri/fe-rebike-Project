import { MapPin } from 'lucide-react';

const lokasiPopuler = [
  { id: 'stasiun-kota-baru', name: 'Stasiun Kota Baru' },
  { id: 'bandara-abd-saleh', name: 'Bandara Abd. Saleh' },
  { id: 'alun-alun-tugu', name: 'Alun-Alun Tugu' },
  { id: 'univ-brawijaya', name: 'Universitas Brawijaya' },
  { id: 'terminal-arjosari', name: 'Terminal Arjosari' },
  { id: 'mall-olympic-garden', name: 'Mall Olympic Garden' },
];

export default function PopularLocationSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Tersedia di Lokasi Populer</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12">
          Jemput motormu dengan mudah di titik-titik strategis Kota Malang.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {lokasiPopuler.map((lokasi) => (
            <div key={lokasi.id} className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm text-gray-700 font-medium">
              <MapPin size={16} className="text-blue-500 mr-2" />
              {lokasi.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}