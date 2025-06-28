import { Link } from 'react-router-dom';

export default function BecomeMitraSection() {
  return (
    <section id="jadi-mitra" className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Punya Usaha Rental Motor? Kembangkan Bisnis Anda Bersama Kami.
        </h2>
        <p className="max-w-3xl mx-auto text-blue-100 mb-8">
          Jangkau ribuan wisatawan dan pelanggan baru setiap bulan. Manfaatkan platform kami untuk manajemen pesanan yang lebih mudah dan efisien.
        </p>
        <Link to="/Registrasi/pendaftaran" legacyBehavior>
          <a className="bg-white text-blue-600 font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors text-lg">
            Daftar Sebagai Mitra
          </a>
        </Link>
      </div>
    </section>
  );
}