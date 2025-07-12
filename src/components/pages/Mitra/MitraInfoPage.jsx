
import React from 'react';
import { ShieldCheck, Smartphone, LogIn } from 'lucide-react';

// Placeholder images - replace with actual links
const qrCodeGooglePlay = 'https://via.placeholder.com/150/000000/FFFFFF/?text=Google+Play';
const qrCodeAppStore = 'https://via.placeholder.com/150/000000/FFFFFF/?text=App+Store';
const appMockup = 'https://via.placeholder.com/300x600'; // Replace with your app mockup

const MitraInfoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden md:flex">
        
        {/* Left Side: Information & CTA */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Pendaftaran Berhasil!
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Selamat datang di keluarga besar Rebike.
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">
              Langkah Terakhir: Unduh Aplikasi Partner
            </h2>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-700">Unduh Aplikasi</h3>
                <p className="text-gray-500">Pindai QR code atau klik tombol di bawah ini.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-700">Install & Buka</h3>
                <p className="text-gray-500">Pasang aplikasi dari App Store atau Google Play.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-700">Login Kembali</h3>
                <p className="text-gray-500">Gunakan email dan password yang sama untuk masuk.</p>
              </div>
            </div>
          </div>

          {/* QR Codes & Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 text-center">
              <img src={qrCodeGooglePlay} alt="Google Play QR Code" className="mx-auto mb-2 rounded-lg"/>
              <a href="#" className="inline-block">
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-12"/>
              </a>
            </div>
            <div className="flex-1 text-center">
              <img src={qrCodeAppStore} alt="App Store QR Code" className="mx-auto mb-2 rounded-lg"/>
              <a href="#" className="inline-block">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-12"/>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: App Mockup */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 p-8 items-center justify-center">
           <div className="text-center text-white">
             <h3 className="text-2xl font-bold mb-4">Kelola Bisnis Anda di Mana Saja</h3>
             <p className="mb-6 opacity-90">Lacak pendapatan, kelola armada, dan terima pesanan secara real-time langsung dari genggaman Anda.</p>
             <Smartphone size={80} className="mx-auto opacity-80" />
           </div>
        </div>

      </div>
       <p className="text-center text-gray-500 text-sm mt-6">
          Ada kendala? <a href="mailto:support@rebike.com" className="text-blue-600 hover:underline">Hubungi Tim Support Kami</a>.
        </p>
    </div>
  );
};

export default MitraInfoPage;
