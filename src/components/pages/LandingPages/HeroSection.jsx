import { useState } from 'react';

export default function HeroSection() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearchClick = () => {
    if (!location || !startDate || !endDate) {
      alert("Harap lengkapi semua field pencarian!");
      return;
    }
    
    console.log("Mencari motor di:", location);
    console.log("Tanggal mulai:", startDate);
    console.log("Tanggal selesai:", endDate);

    alert("Fitur pencarian lengkap tersedia di aplikasi kami! Silakan download sekarang.");
  };

  return (
    <section id="beranda" className="relative h-[80vh] flex items-center justify-center text-white" style={{ backgroundImage: "url('/images/hero-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto text-center z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Sewa Motor di Malang Lebih Mudah dengan Rebike.
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
          Temukan ratusan pilihan motor dari mitra terpercaya. Pesan cepat, liburan tenang.
        </p>
        <div className="mt-8 bg-white/90 p-4 md:p-6 rounded-lg max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 shadow-lg">
        
          <input 
            type="text" 
            placeholder="Pilih Lokasi" 
            className="col-span-1 md:col-span-1 p-3 rounded-md text-gray-700"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input 
            type="date" 
            className="col-span-1 md:col-span-1 p-3 rounded-md text-gray-700"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input 
            type="date" 
            className="col-span-1 md:col-span-1 p-3 rounded-md text-gray-700"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleSearchClick} className="col-span-1 md:col-span-1 bg-blue-600 text-white font-bold p-3 rounded-md hover:bg-blue-700 transition-colors">
            Cari Motor
          </button>
        </div>
      </div>
    </section>
  );
}