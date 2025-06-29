import { Link } from "react-router-dom";
import LandingLayout from "../components/layout/LandingLayout";
import Card from "../components/ui/Card";

export default function LandingPage() {
  return (
    <LandingLayout>
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen bg-cover bg-center flex items-center justify-center pt-16"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1599818390827-2b73c47a6431?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 font-poppins">
            Sewa Motor di Malang Lebih Mudah.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Temukan ratusan pilihan motor dari mitra terpercaya. Pesan cepat,
            liburan tenang.
          </p>
          <a
            href="#download-app"
            className="bg-brand-primary hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition text-lg shadow-md"
          >
            Download Aplikasi
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-2">Kenapa Memilih Rebike?</h2>
          <p className="text-slate-500 mb-12 max-w-2xl mx-auto">
            Kami memberikan yang terbaik untuk perjalanan Anda di Malang, dengan
            jaminan keamanan, kemudahan, dan transparansi.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="flex flex-col items-center p-6 text-center transition hover:shadow-xl">
              <span className="icon-large">🛵</span>
              <h3 className="text-xl font-semibold mb-2">Pilihan Lengkap</h3>
              <p className="text-slate-500">
                Ratusan motor dari berbagai tipe siap menemani petualangan Anda.
              </p>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center transition hover:shadow-xl">
              <span className="icon-large">✅</span>
              <h3 className="text-xl font-semibold mb-2">
                Mitra Terverifikasi
              </h3>
              <p className="text-slate-500">
                Keamanan dan profesionalisme terjamin dari mitra-mitra pilihan
                kami.
              </p>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center transition hover:shadow-xl">
              <span className="icon-large">⚡</span>
              <h3 className="text-xl font-semibold mb-2">Pesan Instan</h3>
              <p className="text-slate-500">
                Proses booking dan pembayaran cepat, semua dalam satu aplikasi.
              </p>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center transition hover:shadow-xl">
              <span className="icon-large">💰</span>
              <h3 className="text-xl font-semibold mb-2">Harga Transparan</h3>
              <p className="text-slate-500">
                Tak ada biaya tersembunyi. Harga yang Anda lihat adalah harga
                yang Anda bayar.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-2">Bagaimana Rebike Bekerja?</h2>
          <p className="text-slate-500 mb-12 max-w-2xl mx-auto">
            Hanya dengan tiga langkah mudah, motor sewaan siap untuk Anda
            kendarai menjelajahi keindahan Malang.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
            <div className="flex-1 flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-brand-primary flex items-center justify-center text-3xl font-bold mb-4">
                1
              </div>
              <span className="step-icon">🔍</span>
              <h3 className="text-xl font-semibold mb-2">Cari & Pilih</h3>
              <p className="text-slate-500">
                Pilih lokasi dan tanggal, lalu temukan motor yang paling sesuai
                untuk Anda.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="hidden md:block h-1 w-20 bg-slate-200 mx-4"></div>
              <div className="block md:hidden w-1 h-12 bg-slate-200 my-4"></div>
            </div>
            <div className="flex-1 flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-brand-primary flex items-center justify-center text-3xl font-bold mb-4">
                2
              </div>
              <span className="step-icon">💳</span>
              <h3 className="text-xl font-semibold mb-2">Booking & Bayar</h3>
              <p className="text-slate-500">
                Lakukan pemesanan dan selesaikan pembayaran dengan aman melalui
                aplikasi.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="hidden md:block h-1 w-20 bg-slate-200 mx-4"></div>
              <div className="block md:hidden w-1 h-12 bg-slate-200 my-4"></div>
            </div>
            <div className="flex-1 flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-brand-primary flex items-center justify-center text-3xl font-bold mb-4">
                3
              </div>
              <span className="step-icon">🗺️</span>
              <h3 className="text-xl font-semibold mb-2">Ambil & Jelajah</h3>
              <p className="text-slate-500">
                Ambil motor di lokasi yang telah ditentukan dan nikmati
                perjalanan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section id="partner-cta" className="py-20 bg-brand-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Punya Usaha Rental Motor?</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Kembangkan bisnis Anda bersama kami. Jangkau ribuan pelanggan baru
            dan kelola usaha Anda dengan lebih mudah.
          </p>
          <Link
            to="/login"
            className="bg-white text-brand-primary hover:bg-slate-100 font-bold py-3 px-8 rounded-lg transition text-lg shadow-md"
          >
            Daftar Sebagai Mitra
          </Link>
        </div>
      </section>

      {/* Download App */}
      <section id="download-app" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-center">
              <img
                src="https://placehold.co/350x600/c7f0ed/0d9488?text=Aplikasi+Rebike"
                alt="Mockup Aplikasi Rebike di Smartphone"
                className="inline-block rounded-3xl shadow-2xl"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">
                Semua Kemudahan Ada di Ujung Jari Anda.
              </h2>
              <p className="text-slate-500 mb-8">
                Unduh aplikasi Rebike sekarang juga dan nikmati pengalaman
                menyewa motor yang belum pernah ada sebelumnya. Cepat, aman, dan
                praktis!
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="#"
                  className="bg-slate-800 text-white py-3 px-6 rounded-lg flex items-center gap-3 hover:bg-slate-900 transition"
                >
                  <span>▶</span>
                  <div>
                    <p className="text-xs">GET IT ON</p>
                    <p className="text-lg font-semibold">Google Play</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="bg-slate-800 text-white py-3 px-6 rounded-lg flex items-center gap-3 hover:bg-slate-900 transition"
                >
                  <span></span>
                  <div>
                    <p className="text-xs">Download on the</p>
                    <p className="text-lg font-semibold">App Store</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
