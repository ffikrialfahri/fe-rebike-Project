import React, { useState, useEffect } from 'react';
import { ShieldCheck, Smartphone, LogIn, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const qrCodeGooglePlay = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://play.google.com';
const qrCodeAppStore = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.apple.com/app-store/';

const stepsData = [
  {
    stepNumber: 0,
    left: {
      title: "Login Berhasil!",
      description: "Selamat datang di keluarga besar Rebike. Langkah terakhir Anda adalah mengunduh Aplikasi Partner kami untuk mulai mengelola bisnis Anda.",
    },
    right: (
      <div className="text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Kelola Bisnis Anda di Mana Saja</h3>
        <p className="mb-6 opacity-90">Lacak pendapatan, kelola armada, dan terima pesanan secara real-time langsung dari genggaman Anda.</p>
        <Smartphone size={80} className="mx-auto opacity-80" />
      </div>
    ),
  },
  {
    stepNumber: 1,
    left: {
      title: "1. Unduh Aplikasi",
      description: "Pilih platform yang sesuai dengan perangkat Anda. Pindai QR code dengan kamera ponsel atau klik logo untuk langsung menuju ke halaman unduhan.",
    },
    right: (
      <div className="w-full text-white flex flex-col items-center justify-center h-full">
         <Download size={60} className="mx-auto opacity-80 mb-4" />
         <h3 className="text-2xl font-bold mb-4">Tersedia untuk Android & iOS</h3>
         <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1 text-center p-4 bg-white/10 rounded-lg">
              <img src={qrCodeGooglePlay} alt="Google Play QR Code" className="mx-auto mb-2 rounded-lg"/>
              <a href="#" className="inline-block" title="Get it on Google Play">
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-12"/>
              </a>
            </div>
            <div className="flex-1 text-center p-4 bg-white/10 rounded-lg">
              <img src={qrCodeAppStore} alt="App Store QR Code" className="mx-auto mb-2 rounded-lg"/>
              <a href="#" className="inline-block" title="Download on the App Store">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-12"/>
              </a>
            </div>
          </div>
      </div>
    ),
  },
  {
    stepNumber: 2,
    left: {
      title: "2. Install & Buka Aplikasi",
      description: "Setelah unduhan selesai, pasang aplikasi di perangkat Anda seperti biasa. Pastikan untuk memberikan izin yang diperlukan agar aplikasi berfungsi optimal.",
    },
    right: (
       <div className="text-center text-white">
         <h3 className="text-2xl font-bold mb-4">Instalasi Aman & Terverifikasi</h3>
         <p className="mb-6 opacity-90">Aplikasi kami telah melewati proses verifikasi untuk memastikan keamanan data dan perangkat Anda.</p>
         <ShieldCheck size={80} className="mx-auto opacity-80" />
       </div>
    ),
  },
  {
    stepNumber: 3,
    left: {
      title: "3. Login Kembali",
      description: "Buka aplikasi yang sudah terpasang, lalu masuk menggunakan email dan password yang telah Anda daftarkan sebelumnya.",
    },
    right: (
       <div className="text-center text-white">
         <h3 className="text-2xl font-bold mb-4">Satu Akun, Semua Akses</h3>
         <p className="mb-6 opacity-90">Gunakan kredensial yang sama untuk mengakses semua fitur manajemen mitra di aplikasi.</p>
         <LogIn size={80} className="mx-auto opacity-80" />
         <p className="text-center text-white text-sm mt-6">
            Ada kendala? <a href="mailto:support@rebike.com" className="text-white hover:underline">Hubungi Tim Support Kami</a>.
          </p>
       </div>
    ),
  },
];

const MitraInfoPage = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, stepsData.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const activeStepData = stepsData[currentStep];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden md:flex"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-slate-800 text-2xl font-bold z-10"
        >
          &times;
        </button>
        
        {/* --- Left Side: Konten Dinamis --- */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div key={currentStep} className="animate-fade-in">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                {activeStepData.left.title}
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                {activeStepData.left.description}
              </p>
            </div>
          </div>
          
          {/* --- Navigasi & Progress Bar --- */}
          <div className="mt-8">
            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-3 mb-6">
                {stepsData.map((step) => (
                    <div 
                        key={step.stepNumber}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                            currentStep >= step.stepNumber ? 'bg-teal-600 scale-125' : 'bg-gray-300'
                        }`}
                    ></div>
                ))}
            </div>

            {/* Tombol Navigasi */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === stepsData.length - 1}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Right Side: Visual Dinamis --- */}
        <div className="hidden md:flex md:w-1/2 bg-teal-500 p-8 items-center justify-center relative overflow-hidden">
           <div key={currentStep} className="w-full h-full flex items-center justify-center animate-fade-in-right">
             {activeStepData.right}
           </div>
        </div>
      </div>
    </div>
  );
};

export default MitraInfoPage;