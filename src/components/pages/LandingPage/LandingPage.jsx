import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import LandingLayout from "@/components/layout/LandingLayout";
import Card from "@/components/ui/Card";
import LoginPage from '@/components/pages/Login/LoginPage';
import {
  MapPin,
  Bike,
  ShieldCheck,
  Zap,
  BadgeDollarSign,
  Search,
  CreditCard,
  Map,
  Play,
  Smartphone
} from 'lucide-react';

// Pastikan path aset Anda benar
import Logo2 from "@/assets/Logo2.png";
import Logo3 from "@/assets/logo3.png";

export default function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const ICON_LOCATIONS = <MapPin className="w-6 h-6" />;

  return (
    // Teruskan `onLoginClick` ke LandingLayout
    <LandingLayout onLoginClick={openLoginModal}>
      {/* Tidak ada elemen <header> di sini lagi. Itu sudah ditangani oleh LandingLayout. */}
      
      {/* Main Content (Section 1) */}
      <main id="hero" className="bg-white">
        <div className="flex flex-col lg:flex-row min-h-[680px]">
          <div className="pt-12 w-full lg:w-1/2 px-6 pb-10 flex flex-col justify-start text-center lg:text-left bg-slate-50">
            <img src={Logo3} alt="Rebike Logo" className="w-20 md:w-48 mb-2 mx-auto lg:mx-0" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 !leading-tight mb-4 mx-auto lg:mx-0">
              Sewa Motor di Malang Lebih Mudah
            </h1>
            <p className="text-slate-600 max-w-lg mb-8 mx-auto lg:mx-0">
              Temukan ratusan pilihan motor berkualitas dari mitra terpercaya kami, siap mengantar Anda menjelajahi keindahan Malang dan sekitarnya. Dengan proses pemesanan yang cepat dan mudah melalui aplikasi, liburan Anda dijamin tenang dan penuh kebebasan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mx-auto lg:mx-0">
              <HashLink to="/#download-app" smooth className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg transition shadow-md text-center">
                Download Aplikasi
              </HashLink>
              <HashLink to="/#partner-cta" smooth className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition shadow-md text-center">
                Jadi Mitra
              </HashLink>
            </div>
          </div>
          <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-6">
            <img src={Logo2} alt="Tiga motor scooter" className="w-full max-w-3xl h-auto"/>
          </div>
        </div>
      </main>

      {/* Why Choose Us (Section 2) */}
        <section id="why-us" className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-2">Kenapa Memilih Rebike?</h2>
            <p className="text-slate-500 mb-12 max-w-2xl mx-auto">
              Kami memberikan yang terbaik untuk perjalanan Anda di Malang, dengan
              jaminan keamanan, kemudahan, dan transparansi.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="flex flex-col items-center p-6 text-center transition hover:shadow-xl bg-white">
                <Bike className="w-12 h-12 text-teal-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Pilihan Lengkap</h3>
                <p className="text-slate-500">
                  Ratusan motor dari berbagai tipe siap menemani petualangan Anda.
                </p>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center transition hover:shadow-xl bg-white">
                <ShieldCheck className="w-12 h-12 text-teal-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Mitra Terverifikasi
                </h3>
                <p className="text-slate-500">
                  Keamanan dan profesionalisme terjamin dari mitra-mitra pilihan
                  kami.
                </p>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center transition hover:shadow-xl bg-white">
                <Zap className="w-12 h-12 text-teal-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Pesan Instan</h3>
                <p className="text-slate-500">
                  Proses booking dan pembayaran cepat, semua dalam satu aplikasi.
                </p>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center transition hover:shadow-xl bg-white">
                <BadgeDollarSign className="w-12 h-12 text-teal-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Harga Transparan</h3>
                <p className="text-slate-500">
                  Tak ada biaya tersembunyi. Harga yang Anda lihat adalah harga
                  yang Anda bayar.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works (Section 3) */}
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
              <Search className="w-12 h-12 text-teal-500 mb-4" />
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
              <CreditCard className="w-12 h-12 text-teal-500 mb-4" />
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
              <Map className="w-12 h-12 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ambil & Jelajah</h3>
              <p className="text-slate-500">
                Ambil motor di lokasi yang telah ditentukan dan nikmati
                perjalanan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      { /* Popular Locations Section */}
      <section id="popular-locations" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-2">Tersedia di Lokasi Populer</h2>
          <p className="text-slate-500 mb-12 max-w-2xl mx-auto">
            Jemput motormu dengan mudah di titik-titik strategis Kota Malang.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://maps.app.goo.gl/MMCQzdoikSSYcXXu5"
              className="flex items-center gap-2 bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-700 transition shadow-md"
            >
              {ICON_LOCATIONS}
              Alun-Alun Kota Malang
            </a>
            <a
              href="https://maps.app.goo.gl/bL7G1Q17LiF1T3Lr8"
              className="flex items-center gap-2 bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-700 transition shadow-md"
            >
              {ICON_LOCATIONS}
              Stasiun Malang Kota Lama
            </a>
            <a
              href="https://maps.app.goo.gl/rvawmjBVLuaGZ9Ps9"
              className="flex items-center gap-2 bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-700 transition shadow-md"
            >
              {ICON_LOCATIONS}
              Stasiun Blimbing
            </a>
            <a
              href="https://maps.app.goo.gl/M2DriUebLBwnm9a2A"
              className="flex items-center gap-2 bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-700 transition shadow-md"
            >
              {ICON_LOCATIONS}
              Universitas Brawijaya
            </a>

            <a
              href="https://maps.app.goo.gl/iqkJSpY5Y5cSHxen9"
              className="flex items-center gap-2 bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-700 transition shadow-md"
            >
              {ICON_LOCATIONS}
              Mall Dinoyo City
            </a>
            <a
              href="https://maps.app.goo.gl/MrBm7H8ecFni8Vep8"
              className="flex items-center gap-2 bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-700 transition shadow-md"
            >
              {ICON_LOCATIONS}
              Universitas Muhammadiyah
            </a>
          </div>
        </div>
      </section>

        {/* Partner CTA (Section 4) */}
      <section id="partner-cta" className="py-20 bg-brand-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Punya Usaha Rental Motor?</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Kembangkan bisnis Anda bersama kami. Jangkau ribuan pelanggan baru
            dan kelola usaha Anda dengan lebih mudah.
          </p>
          <Link
            to="/register"
            className="bg-white text-brand-primary hover:bg-slate-100 font-bold py-3 px-8 rounded-lg transition text-lg shadow-md"
          >
            Daftar Sebagai Mitra
          </Link>
        </div>
      </section>

        {/* Download App (Sections 5)*/}
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
                    <Play className="w-6 h-6" />
                    <div>
                      <p className="text-xs">GET IT ON</p>
                      <p className="text-lg font-semibold">Google Play</p>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="bg-slate-800 text-white py-3 px-6 rounded-lg flex items-center gap-3 hover:bg-slate-900 transition"
                  >
                    <Smartphone className="w-6 h-6" />
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
      <LoginPage isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </LandingLayout>
  );
}