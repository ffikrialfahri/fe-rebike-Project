export default function DownloadSection() {
  return (
    <section id="download" className="py-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Semua Kemudahan Ada di Ujung Jari Anda.
          </h2>
          <p className="text-gray-600 mb-8">
            Download aplikasi Rebike sekarang untuk pengalaman sewa motor yang cepat, aman, dan tanpa ribet.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="/images/google-play-badge.png" alt="Get it on Google Play" className="h-12" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="/images/app-store-badge.png" alt="Download on the App Store" className="h-12" />
            </a>
          </div>
        </div>
        <div className="flex justify-center">

          <div className="w-64 h-[500px] bg-gray-200 rounded-3xl border-8 border-gray-800 flex items-center justify-center">
            <p className="text-gray-500 font-bold">App Mockup</p>
          </div>
        </div>
      </div>
    </section>
  );
}