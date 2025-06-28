import { Search, CreditCard, KeyRound } from 'lucide-react';

const steps = [
  { icon: <Search />, title: "1. Cari & Pilih", description: "Pilih lokasi dan tanggal, temukan motor yang paling sesuai dengan kebutuhanmu." },
  { icon: <CreditCard />, title: "2. Booking & Bayar", description: "Lakukan pemesanan dan selesaikan pembayaran dengan berbagai metode yang aman." },
  { icon: <KeyRound />, title: "3. Ambil & Jelajah", description: "Ambil motor di lokasi penjemputan yang telah disepakati dan nikmati perjalananmu." },
];

export default function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Hanya 3 Langkah Mudah</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">

          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gray-200" style={{ transform: 'translateY(-50%)', zIndex: -1 }}></div>

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 rounded-full p-6 mb-4 z-10 border-4 border-white">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}