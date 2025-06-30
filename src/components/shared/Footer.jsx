export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-extrabold mb-4 font-poppins text-teal-400">
              Rebike
            </h3>
            <p className="text-slate-400 text-sm">
              Platform sewa motor terpercaya di Malang, menghubungkan pemilik
              rental dengan wisatawan.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Tautan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">📧 support@re-bike.com</li>
              <li className="text-slate-400">📞 +62 812 3456 7890</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Media Sosial</h3>
            <div className="flex space-x-4 text-lg">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition"
              >
                📘
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition"
              >
                📸
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition"
              >
                🐦
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} Rebike. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
