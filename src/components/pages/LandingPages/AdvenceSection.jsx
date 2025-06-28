import { CheckCircle, CircleDollarSign, ShieldCheck, Users } from 'lucide-react';

const features = [
  { icon: <Users size={40} className="text-blue-600" />, title: "Pilihan Lengkap", description: "Ratusan motor dari berbagai tipe siap menemani perjalanan Anda." },
  { icon: <ShieldCheck size={40} className="text-blue-600" />, title: "Mitra Terverifikasi", description: "Kami hanya bekerja sama dengan mitra rental yang profesional dan terpercaya." },
  { icon: <CheckCircle size={40} className="text-blue-600" />, title: "Pesan Instan", description: "Proses booking dan pembayaran cepat, aman, dan mudah via aplikasi." },
  { icon: <CircleDollarSign size={40} className="text-blue-600" />, title: "Harga Transparan", description: "Lihat harga final sejak awal, tanpa ada biaya tersembunyi." },
];

export default function AdvenceSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Kenapa Memilih Rebike?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12">Kami memberikan yang terbaik untuk kenyamanan dan keamanan perjalanan Anda di Malang.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}